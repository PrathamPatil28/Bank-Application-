package com.bank.IOBANK.service;

import com.bank.IOBANK.entity.Account;
import com.bank.IOBANK.entity.Card;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.enums.Type;

import java.util.List;

public interface TransactionService {

    public Transaction createAccountTransaction(double amount, Type type, double txFee, User user, Account account);

    Transaction createCardTransaction(double amount, Type type, double txFee, User user, Card card);

    public List<Transaction> getAllTransactions (String page , User user);

    public List<Transaction> getTransactionByCardId(String cardId,String page , User user );

    public List<Transaction> getTransactionByAccountId(String accountId,String page , User user );
}
