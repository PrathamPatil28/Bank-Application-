package com.bank.IOBANK.serviceImpl;

import com.bank.IOBANK.entity.Card;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.enums.Type;
import com.bank.IOBANK.helper.AccountHelper;
import com.bank.IOBANK.repo.CardRepo;
import com.bank.IOBANK.service.CardService;
import com.bank.IOBANK.service.TransactionService;
import com.bank.IOBANK.utils.RandomUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepo cardRepo;

    @Autowired
    private AccountHelper accountHelper;

    @Autowired
    private TransactionService transactionService;


    @Override
    public Card getCard(User user) {
        return cardRepo.findByOwner_Id(user.getId())
                .orElseThrow(() -> new RuntimeException("Card not found for user: " + user.getId()));
    }


    @Override
    public Card createCard(double amount, User user) throws Exception {
        if (amount < 2){
            throw new IllegalArgumentException("Amount should be at least $2");
        }

        if(!accountHelper.existsByCodeAndOwnerUid("USD", user.getId())) {
            throw new IllegalArgumentException("USD Account not found for this user so card cannot be created");
        }

        var usdAccount = accountHelper.findByCodeAndOwnerUid("USD", user.getId()).orElseThrow();
        accountHelper.validateSufficientFunds(usdAccount,amount);

        usdAccount.setBalance(usdAccount.getBalance() - amount);

        long cardNumber;

        do {
            cardNumber = generateCardNumber();
        }while(cardRepo.existsByCardNumber(cardNumber));

        Card card = Card.builder()
                .cardHolder(user.getFirstName() + " " + user.getLastName())
                .cardNumber(cardNumber)
                .exp(LocalDate.now().plusYears(3))
                .cvv(new RandomUtil().generateRandom(3).toString())
                .balance(amount - 1)
                .owner(user)
                .build();

        card = cardRepo.save(card);

       transactionService.createAccountTransaction(1, Type.WITHDRAW,0.00,user,usdAccount);

       transactionService.createAccountTransaction(amount- 1 , Type.WITHDRAW, 0.00,user,usdAccount);

       transactionService.createCardTransaction(amount - 1, Type.WITHDRAW, 0.00,user ,card);

       accountHelper.save(usdAccount);
        return card;
    }


    public long generateCardNumber(){
        return new RandomUtil().generateRandom(16);
    }

    @Override
    public Transaction creditCard(double amount, User user) {
        var usdAccount = accountHelper.findByCodeAndOwnerUid("USD", user.getId()).orElseThrow();
        usdAccount.setBalance(usdAccount.getBalance() - amount);

        transactionService.createAccountTransaction(amount, Type.WITHDRAW,0.00,user,usdAccount);

        var card = user.getCard();
        card.setBalance(card.getBalance() + amount);

        cardRepo.save(card);
        return transactionService.createCardTransaction(amount,Type.CREDIT,0.00,user,card);
    }

    @Override
    public Transaction debitCard(double amount, User user) {
        var usdAccount = accountHelper.findByCodeAndOwnerUid("USD", user.getId()).orElseThrow();
        usdAccount.setBalance(usdAccount.getBalance() + amount);

        transactionService.createAccountTransaction(amount, Type.DEPOSIT,0.00,user,usdAccount);

        var card = user.getCard();
        card.setBalance(card.getBalance() - amount);

        cardRepo.save(card);
        return transactionService.createCardTransaction(amount,Type.DEBIT,0.00,user,card);
    }


}
