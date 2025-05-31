package com.bank.IOBANK.repo;

import com.bank.IOBANK.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface AccountRepo extends JpaRepository<Account,String> {

    boolean existsByAccountNumber(Long accountNumber);

    boolean existsByCodeAndOwner_Id(String code, String id);

    List<Account> findByOwner_Id(String id);

    Optional<Account> findByCodeAndOwner_Id(String code, String ownerId); // ✅ Correct

    Optional<Account> findByAccountNumber(Long accountNumber);

    Optional<Account> findByCodeAndAccountNumber(String code, long recipientAccountNumber);

}
