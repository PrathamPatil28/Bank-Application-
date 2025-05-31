package com.bank.IOBANK.serviceImpl;

import com.bank.IOBANK.dto.UserDTO;
import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.jwt.JwtService;
import com.bank.IOBANK.repo.UserRepo;
import com.bank.IOBANK.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;


    @Override
    public User registerUser(UserDTO userDTO) {
        User user = mapToUser(userDTO);
        return userRepo.save(user);
    }

    @Override
    public Map<String, Object> loginUser(UserDTO userDTO) {
        Map<String , Object> authObject = new HashMap<>();

        User user = (User) userDetailsService.loadUserByUsername(userDTO.getUsername());

        if (user == null){
            throw  new UsernameNotFoundException("User Not Found");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getUsername(),userDTO.getPassword()));

        authObject.put("token", "Bearer ".concat(jwtService.generateToken(userDTO.getUsername())));

        authObject.put("user", user);

       return authObject;
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }



    private User mapToUser(UserDTO dto){
        return User.builder()
                .lastName(dto.getLastName())
                .firstName(dto.getFirstName())
                .username(dto.getUsername())
                .password(passwordEncoder.encode(dto.getPassword()))
                .gender(dto.getGender())
                .dob(dto.getDob())
                .tel(dto.getPhone())
                .roles(List.of("USER"))
                .tag("io_" + dto.getUsername())
                .build();
    }
}
