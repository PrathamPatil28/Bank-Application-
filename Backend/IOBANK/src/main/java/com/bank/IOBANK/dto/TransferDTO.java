package com.bank.IOBANK.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferDTO {

    private long recipientAccountNumber;

    private double amount;

    private String code;

}
