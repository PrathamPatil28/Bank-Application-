package com.bank.IOBANK.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String firstName;

    private String lastName;

    private String username;

    private LocalDate dob;

    private String phone;

    private String tag;

    private String password;

    private String gender;
}
