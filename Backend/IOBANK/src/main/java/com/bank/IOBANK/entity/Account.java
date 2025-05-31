package com.bank.IOBANK.entity;

import com.bank.IOBANK.enums.Status;
import com.bank.IOBANK.enums.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String accountId;

    private double balance;

    private String accountName;

    @Column(unique = true, nullable = false)
    private long accountNumber;

    private String currency;

    private String code;

    private String label;

    private char symbol;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private Status status;

    private Type type;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch =FetchType.LAZY)
    @JsonIgnore
    private List<Transaction> transaction;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;
}
