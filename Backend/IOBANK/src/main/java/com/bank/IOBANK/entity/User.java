package com.bank.IOBANK.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String firstName;

    private String lastName;

    @Column(nullable = false , unique = true)
    private String username;

    private LocalDate dob;

    private String tel;

    private String tag;

    @JsonIgnore
    private String password;

    private String gender;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private List<String> roles;


    @OneToOne(mappedBy = "owner")
    @JsonIgnore
    private Card card;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch =FetchType.LAZY)
    @JsonIgnore
    private List<Transaction> transaction;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch =FetchType.LAZY)
    @JsonIgnore
    private List<Account> accounts;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());

    }


}
