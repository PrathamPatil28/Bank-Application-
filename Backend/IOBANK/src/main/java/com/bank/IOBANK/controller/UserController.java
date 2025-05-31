package com.bank.IOBANK.controller;

import com.bank.IOBANK.dto.UserDTO;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
   private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDTO userDTO){
        return new ResponseEntity<>(userService.registerUser(userDTO), HttpStatus.CREATED);
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDTO userDTO){
        var authObject = userService.loginUser(userDTO);
        var token = (String) authObject.get("token");
        System.out.println("token"  + token);
        return ResponseEntity.ok()
                      .header("Authorization" , token)
                      .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS,"Authorization")
                      .body(authObject.get("user"));

    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String username = authentication.getName(); // From JWT token
        User user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }


}
