package com.bank.IOBANK.service;

import com.bank.IOBANK.dto.AccountDTO;
import com.bank.IOBANK.dto.ConvertDTO;
import com.bank.IOBANK.dto.DepositDTO;
import com.bank.IOBANK.dto.TransferDTO;
import com.bank.IOBANK.entity.Account;
import com.bank.IOBANK.entity.Transaction;
import com.bank.IOBANK.entity.User;
import org.springframework.http.HttpStatusCode;

import javax.naming.OperationNotSupportedException;
import java.util.List;
import java.util.Map;

public interface AccountService {


    Account createAccount(AccountDTO accountDTO, User user) throws OperationNotSupportedException;

    List<Account> getUserAccounts(String id);

    Transaction transferFunds(TransferDTO transferDTO, User user) throws Exception;

    Map<String, Double> getExchangeRate();

    Transaction convertCurrency(ConvertDTO convertDto, User user) throws Exception;

    Account findAccount(String code, long recipientAccountNumber);

    Transaction depositFunds(DepositDTO depositDTO, User user) throws Exception;

    Transaction depositToAnotherAccount(DepositDTO depositDTO, User user) throws Exception;

}
