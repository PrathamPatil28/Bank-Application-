package com.bank.IOBANK.service;

import com.bank.IOBANK.dto.UserDTO;
import com.bank.IOBANK.entity.User;

import java.util.Map;

public interface UserService {

    public User registerUser(UserDTO userDTO);

    Map<String , Object> loginUser(UserDTO userDTO);

    public User getUserByUsername(String username);


}
