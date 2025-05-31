package com.bank.IOBANK.service;

import com.bank.IOBANK.entity.Card;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;

public interface CardService {

    Card getCard(User user);

    Card createCard(double amount, User user) throws Exception;

    Transaction creditCard(double amount, User user);

    Transaction debitCard(double amount, User user);
}
