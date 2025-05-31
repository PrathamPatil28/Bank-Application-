package com.bank.IOBANK.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {


    private String code;

    private String label;

    private char symbol;
}
