package com.bank.IOBANK.repo;

import com.bank.IOBANK.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, String> {

    User findByUsernameIgnoreCase(String userName);

    Optional<User> findByUsername(String username); // ✅ Add this line

}
