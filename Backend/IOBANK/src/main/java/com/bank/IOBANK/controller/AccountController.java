package com.bank.IOBANK.controller;


import com.bank.IOBANK.Response.AccountResponseDTO;
import com.bank.IOBANK.dto.AccountDTO;
import com.bank.IOBANK.dto.ConvertDTO;
import com.bank.IOBANK.dto.DepositDTO;
import com.bank.IOBANK.dto.TransferDTO;
import com.bank.IOBANK.entity.Account;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.naming.OperationNotSupportedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/account")

public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<AccountResponseDTO> createAccount(@RequestBody AccountDTO accountDTO, Authentication authentication) throws OperationNotSupportedException {
        var user = (User) authentication.getPrincipal();
        Account account = accountService.createAccount(accountDTO, user);

        AccountResponseDTO responseDTO = new AccountResponseDTO(
                account.getAccountId(),
                account.getAccountNumber(),
                account.getBalance(),
                account.getCode(),
                account.getLabel(),
                account.getSymbol()
        );

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/userAccount")
    public ResponseEntity <List<Account>> userAccounts(Authentication authentication){
           var user = (User) authentication.getPrincipal();
           return ResponseEntity.ok(accountService.getUserAccounts(user.getId()));
    }

    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transferFunds(@RequestBody TransferDTO transferDTO , Authentication authentication) throws Exception {

        var user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(accountService.transferFunds(transferDTO,user));
    }

    @GetMapping("/rates")
    public ResponseEntity<Map<String ,Double>> getExchangeRate(){
        return ResponseEntity.ok(accountService.getExchangeRate());
    }

    @PostMapping("/convert")
    public ResponseEntity<Transaction> convertCurrency(@RequestBody ConvertDTO convertDTO , Authentication authentication) throws Exception {

        var user = (User) authentication.getPrincipal();

        return ResponseEntity.ok(accountService.convertCurrency(convertDTO, user));
    }

    @PostMapping("/find")
    public ResponseEntity<Account> findAccount(@RequestBody TransferDTO dto) {
        return ResponseEntity.ok(accountService.findAccount(dto.getCode() ,dto.getRecipientAccountNumber()));
    }

    @PostMapping("/deposit")
    public ResponseEntity<Transaction> deposit(@RequestBody DepositDTO depositDTO, Authentication authentication) throws Exception {
        var user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(accountService.depositFunds(depositDTO, user));
    }


    @PostMapping("/deposit-to-other")
    public ResponseEntity<Transaction> depositToOtherAccount(@RequestBody DepositDTO depositDTO, Authentication authentication) throws Exception {
        var user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(accountService.depositToAnotherAccount(depositDTO, user));
    }





}
