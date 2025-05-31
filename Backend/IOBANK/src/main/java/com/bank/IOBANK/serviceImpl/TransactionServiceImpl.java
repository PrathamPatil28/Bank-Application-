package com.bank.IOBANK.serviceImpl;

import com.bank.IOBANK.entity.Account;
import com.bank.IOBANK.entity.Card;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.enums.Status;
import com.bank.IOBANK.enums.Type;
import com.bank.IOBANK.repo.TransactionRepo;
import com.bank.IOBANK.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepo transactionRepo;

    @Override
    public Transaction createAccountTransaction(double amount, Type type, double txFee, User user, Account account) {
        var tx = Transaction.builder()
                .txFee(txFee)
                .amount(amount)
                .type(type)
                .status(Status.COMPLETED)
                .owner(user)
                .account(account)
                .build();

        return transactionRepo.save(tx);
    }

    @Override
    public Transaction createCardTransaction(double amount, Type type, double txFee, User user, Card card) {
        Transaction tx = Transaction.builder()
                .txFee(txFee)
                .amount(amount)
                .type(type)
                .card(card)
                .status(Status.COMPLETED)
                .owner(user)
                .build();
        return transactionRepo.save(tx);
    }

    public List<Transaction> getAllTransactions (String page , User user){
        Pageable pageable = PageRequest.of(Integer.parseInt(page),10, Sort.by("createdAt").ascending());

        return transactionRepo.findAllByOwner_Id(user.getId(),pageable).getContent();
    }

    public List<Transaction> getTransactionByCardId(String cardId,String page , User user ){
        Pageable pageable = PageRequest.of(Integer.parseInt(page),10, Sort.by("createdAt").ascending());

        return transactionRepo.findAllByCardCardIdAndOwner_Id(cardId, user.getId(), pageable).getContent();
    }

    public List<Transaction> getTransactionByAccountId(String accountId,String page , User user ){
        Pageable pageable = PageRequest.of(Integer.parseInt(page),10, Sort.by("createdAt").ascending());

        return transactionRepo.findAllByAccountAccountIdAndOwner_Id(accountId, user.getId(), pageable).getContent();
    }


}

