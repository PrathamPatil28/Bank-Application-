package com.bank.IOBANK.repo;

import com.bank.IOBANK.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardRepo extends JpaRepository<Card,String> {



    Optional<Card> findByOwner_Id(String id);  // <-- CHANGED

    boolean existsByCardNumber(double cardNumber);
}
