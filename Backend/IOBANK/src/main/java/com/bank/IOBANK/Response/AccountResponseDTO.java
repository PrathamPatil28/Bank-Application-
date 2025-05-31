package com.bank.IOBANK.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponseDTO {
    private String accountId;
    private long accountNumber;
    private double balance;
    private String code;
    private String label;
    private char symbol;
}
