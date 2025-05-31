package com.bank.IOBANK.controller;

import com.bank.IOBANK.entity.Card;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;


    @GetMapping("/getCard")
    public ResponseEntity<Card> getCard(Authentication authentication){

        var user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(cardService.getCard(user));
    }

    @PostMapping("/create")
    public ResponseEntity<Card> createCard (@RequestParam double amount, Authentication authentication) throws Exception {

        var user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(cardService.createCard(amount,user));
    }

    @PostMapping("/credit")
    public ResponseEntity<Transaction> creditCard (@RequestParam double amount, Authentication authentication){

        var user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(cardService.creditCard(amount,user));
    }

    @PostMapping("/debit")
    public ResponseEntity<Transaction> debitCard (@RequestParam double amount, Authentication authentication){

        var user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(cardService.debitCard(amount,user));
    }




}
