package com.bank.IOBANK.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConvertDTO {

    private String fromCurrency;

    private String toCurrency;

    private double amount;
}
