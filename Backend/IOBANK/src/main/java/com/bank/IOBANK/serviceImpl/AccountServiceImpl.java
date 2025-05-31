package com.bank.IOBANK.serviceImpl;

import com.bank.IOBANK.component.ExchangeRateService;
import com.bank.IOBANK.dto.AccountDTO;
import com.bank.IOBANK.dto.ConvertDTO;
import com.bank.IOBANK.dto.DepositDTO;
import com.bank.IOBANK.dto.TransferDTO;
import com.bank.IOBANK.entity.Account;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.helper.AccountHelper;
import com.bank.IOBANK.repo.AccountRepo;
import com.bank.IOBANK.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.OperationNotSupportedException;
import java.util.List;
import java.util.Map;


@Service
@Transactional
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepo accountRepo;

    @Autowired
    private AccountHelper accountHelper;

    @Autowired
    private ExchangeRateService exchangeRateService;


    @Override
    public Account createAccount(AccountDTO accountDTO, User user) throws OperationNotSupportedException {
        return accountHelper.createAccount(accountDTO, user);
    }

    @Override
    public List<Account> getUserAccounts(String id) {
        return accountRepo.findByOwner_Id(id);
    }

    @Override
    public Transaction transferFunds(TransferDTO transferDTO, User user) throws Exception {
        var senderAccount = accountRepo.findByCodeAndOwner_Id(transferDTO.getCode(), user.getId())
                .orElseThrow(()-> new UnsupportedOperationException("Account of type currency do nt exist for user"));

        var receiverAccount= accountRepo.findByAccountNumber(transferDTO.getRecipientAccountNumber())
                .orElseThrow();

        return accountHelper.performTransfer(senderAccount,receiverAccount,transferDTO.getAmount(),user);
    }

    @Override
    public Map<String, Double> getExchangeRate() {
       return exchangeRateService.getRates();
    }

    @Override
    public Transaction convertCurrency(ConvertDTO convertDto, User user) throws Exception {
        return accountHelper.convertCurrency(convertDto,user);
    }

    public Account findAccount(String code, long recipientAccountNumber) {
        System.out.println("Account Number : " + recipientAccountNumber);
        System.out.println("Code: " + code);
        return accountRepo.findByCodeAndAccountNumber(code, recipientAccountNumber).orElseThrow();
    }

    @Override
    public Transaction depositFunds(DepositDTO depositDTO, User user) throws Exception {
        return accountHelper.depositFunds(depositDTO,user);
    }

    @Override
    public Transaction depositToAnotherAccount(DepositDTO depositDTO, User user) throws Exception {
        return accountHelper.depositToAccount(depositDTO,user);
    }


}

