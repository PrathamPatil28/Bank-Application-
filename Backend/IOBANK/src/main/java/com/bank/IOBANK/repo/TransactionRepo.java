package com.bank.IOBANK.repo;

import com.bank.IOBANK.entity.Transaction;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface TransactionRepo extends JpaRepository<Transaction,String> {


    Page<Transaction> findAllByOwner_Id(String uid, Pageable pageable);

    Page<Transaction> findAllByCardCardIdAndOwner_Id(String cardId, String uid, Pageable pageable);

    Page<Transaction> findAllByAccountAccountIdAndOwner_Id(String accountId, String uid, Pageable pageable);
}
