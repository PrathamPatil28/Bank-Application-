package com.bank.IOBANK.helper;

import com.bank.IOBANK.component.ExchangeRateService;
import com.bank.IOBANK.dto.AccountDTO;
import com.bank.IOBANK.dto.ConvertDTO;
import com.bank.IOBANK.dto.DepositDTO;
import com.bank.IOBANK.entity.Account;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.enums.Type;
import com.bank.IOBANK.repo.AccountRepo;
import com.bank.IOBANK.repo.TransactionRepo;
import com.bank.IOBANK.service.TransactionService;
import com.bank.IOBANK.utils.RandomUtil;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.naming.OperationNotSupportedException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@Data
public class  AccountHelper {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private TransactionRepo transactionRepo;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private ExchangeRateService exchangeRateService;

    private final Map<String, String> CURRENCIES = Map.of(
            "USD", "United States Dollar",
            "EUR", "Euro",
            "GBP", "British Pound",
            "JPY", "Japanese Yen",
            "NGN", "Nigerian Naira",
            "INR", "Indian Rupee"
    );


    public Account createAccount(AccountDTO accountDTO, User user) throws OperationNotSupportedException {
        long accountNumber;

        validAccountNonExistsForUser(accountDTO.getCode(), user.getId());

        do {
            accountNumber = new RandomUtil().generateRandom(10);
        }while (accountRepo.existsByAccountNumber(accountNumber));

        var  account =Account.builder()
                .accountNumber(accountNumber)
                .accountName(user.getFirstName() + " " + user.getLastName())

                .balance(1000)
                .owner(user)
                .code(accountDTO.getCode())
                .symbol(accountDTO.getSymbol())
                .label(CURRENCIES.get(accountDTO.getCode()))
                .build();

        return accountRepo.save(account);

    }


    public Transaction performTransfer(Account senderAccount, Account receiverAccount, double amount,User user) throws Exception {

        validateSufficientFunds(senderAccount,amount * 1.01);

        senderAccount.setBalance(senderAccount.getBalance() - amount * 1.01);

        receiverAccount.setBalance(receiverAccount.getBalance() + amount);

        accountRepo.saveAll(List.of(senderAccount,receiverAccount));

        var senderTransaction = transactionService.createAccountTransaction(
                amount,
                Type.WITHDRAW,
                amount * 1.01,
                user,
                senderAccount
        );

        var receiverTransaction = transactionService.createAccountTransaction(
                amount,
                Type.DEPOSIT,
                0.00,
                receiverAccount.getOwner(),
                receiverAccount
        );

        return senderTransaction;


    }

    public void validAccountNonExistsForUser(String code , String uid) throws OperationNotSupportedException {
        if (accountRepo.existsByCodeAndOwner_Id(code,uid)){
            throw new OperationNotSupportedException("Account of this type already exists");
        }
    }

    public void  validAccountOwner(Account account, User user) throws OperationNotSupportedException{
        if (!account.getOwner().getId().equals(user.getId())){
            throw new OperationNotSupportedException("Invalid Account Owner");
        }
    }

    public void validateSufficientFunds(Account account, double amount) throws Exception {
        if (account.getBalance() < amount) {
            throw new OperationNotSupportedException("Insufficient funds in the account");
        }
    }

    public void validAmount(double amount) {
        if (amount <=0 ){
            throw new IllegalArgumentException("Invalid Amount");
        }
    }

    public void validateDifferentCurrencyType(ConvertDTO convertDTO) throws  Exception{
        if (convertDTO.getToCurrency().equals(convertDTO.getFromCurrency())){
            throw  new IllegalArgumentException("Conversion Between the Same Currency Type is not allowed");
        }
    }
    public void validateAccountOwnerShip(ConvertDTO convertDTO, String id) {
        System.out.println("Validating ownership for ToCurrency: " + convertDTO.getToCurrency() + ", User ID: " + id);
        accountRepo.findByCodeAndOwner_Id(convertDTO.getFromCurrency(), id)
                .orElseThrow(() -> new IllegalArgumentException("From currency account does not exist for user"));

        accountRepo.findByCodeAndOwner_Id(convertDTO.getToCurrency(), id)
                .orElseThrow(() -> new IllegalArgumentException("To currency account does not exist for user"));
    }

    public void validateAccountOwnership(String code, String uid) throws Exception {
        accountRepo.findByCodeAndOwner_Id(code,uid).orElseThrow();
    }


    public void validateConversion(ConvertDTO convertDTO, String id) throws Exception{
       validateDifferentCurrencyType(convertDTO);
       validateAccountOwnerShip(convertDTO,id);
       validAmount(convertDTO.getAmount());
       validateSufficientFunds(accountRepo.findByCodeAndOwner_Id(convertDTO.getFromCurrency(), id).get(),convertDTO.getAmount());

    }



    public Transaction convertCurrency(ConvertDTO convertDto, User user) throws Exception {
        validateConversion(convertDto, user.getId());
        var rates = exchangeRateService.getRates();
        var sendingRates = rates.get(convertDto.getFromCurrency());
        var receivingRates = rates.get(convertDto.getToCurrency());
        var computedAmount = (receivingRates/sendingRates) * convertDto.getAmount();
        Account fromAccount = accountRepo.findByCodeAndOwner_Id(convertDto.getFromCurrency(), user.getId()).orElseThrow();
        Account toAccount = accountRepo.findByCodeAndOwner_Id(convertDto.getToCurrency(), user.getId()).orElseThrow();
        fromAccount.setBalance(fromAccount.getBalance() - (convertDto.getAmount() * 1.01));
        toAccount.setBalance(toAccount.getBalance() + computedAmount);
        accountRepo.saveAll(List.of(fromAccount, toAccount));

        var fromAccountTransaction = transactionService.createAccountTransaction(convertDto.getAmount(), Type.CONVERSION, convertDto.getAmount() * 0.01, user, fromAccount);
        var toAccountTransaction = transactionService.createAccountTransaction(computedAmount, Type.DEPOSIT, convertDto.getAmount() * 0.00, user, toAccount);
        return fromAccountTransaction;
    }

    public boolean existsByCodeAndOwnerUid(String code, String uid) {
        return accountRepo.existsByCodeAndOwner_Id(code,uid);
    }

    public Optional<Account>  findByCodeAndOwnerUid(String code, String uid){
        return accountRepo.findByCodeAndOwner_Id(code,uid);
    }

    public Account save(Account usdAccount) {
        return accountRepo.save(usdAccount);
    }

    public Transaction depositFunds(DepositDTO depositDTO, User user) throws Exception {
        // Validate amount
        validAmount(depositDTO.getAmount());

        // Fetch the target account using code + account number
        Account account = accountRepo.findByCodeAndAccountNumber(depositDTO.getCode(), depositDTO.getAccountNumber())
                .orElseThrow(() -> new IllegalArgumentException("Target account not found for provided code and account number"));

        // Update balance
        account.setBalance(account.getBalance() + depositDTO.getAmount());

        // Save account
        accountRepo.save(account);

        // Create and return deposit transaction (logged in user's action on someone else's account)
        return transactionService.createAccountTransaction(
                depositDTO.getAmount(),
                Type.DEPOSIT,
                0.00,
                user, // Who initiated the deposit
                account
        );
    }


    public Transaction depositToAccount(DepositDTO depositDTO, User depositor) throws Exception {
        validAmount(depositDTO.getAmount());

        Account targetAccount = accountRepo.findByCodeAndAccountNumber(
                depositDTO.getCode(), depositDTO.getAccountNumber()
        ).orElseThrow(() -> new IllegalArgumentException("Target account not found"));

        targetAccount.setBalance(targetAccount.getBalance() + depositDTO.getAmount());
        accountRepo.save(targetAccount);

        return transactionService.createAccountTransaction(
                depositDTO.getAmount(),
                Type.DEPOSIT,
                0.00,
                targetAccount.getOwner(),
                targetAccount
        );
    }


}




