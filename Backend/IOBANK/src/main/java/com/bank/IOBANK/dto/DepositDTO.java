package com.bank.IOBANK.dto;

import lombok.Data;

@Data
public class DepositDTO {
    private String code;            // e.g., "USD"
    private long accountNumber;     // Target account number
    private double amount;          // Deposit amount
}
