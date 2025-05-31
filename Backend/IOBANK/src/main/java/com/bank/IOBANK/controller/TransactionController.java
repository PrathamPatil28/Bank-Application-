package com.bank.IOBANK.controller;

import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;


    @GetMapping("/all")
    public List<Transaction> getAllTransactions(@RequestParam String page , Authentication authentication){
        return  transactionService.getAllTransactions(page,(User) authentication.getPrincipal());
    }

    @GetMapping("/card/{cardId}")
    public List<Transaction> getTransactionsByCardId(@PathVariable String cardId, @RequestParam String page, Authentication auth) {
        return transactionService.getTransactionByCardId(cardId, page, (User) auth.getPrincipal());
    }

    @GetMapping("/account/{accountId}")
    public List<Transaction> getTransactionsByAccountId(@PathVariable String accountId, @RequestParam String page, Authentication auth) {
        return transactionService.getTransactionByAccountId(accountId, page, (User) auth.getPrincipal());
    }
}
