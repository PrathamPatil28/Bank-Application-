package com.bank.IOBANK.entity;

import com.bank.IOBANK.enums.Status;
import com.bank.IOBANK.enums.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private Double amount;

    private  Double txFee;

    private String sender;

    private String receiver;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @CreationTimestamp
    private  LocalDateTime createdAt;

    @Enumerated(value = EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private Type type;


    @ManyToOne
    @JoinColumn(name = "card_id")
    @JsonIgnore
    private Card card;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;

    @ManyToOne
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private Account account;


}
