package com.bank.IOBANK.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private static  final  long EXPIRATION_TIME=86400000;

//    private static final String TOKEN_PREFIX="Bearer ";
//
//    private static final String HEADER_STRING ="Authorization";

    @Value("${jwt.secret}")
    private String jwtSecrete;

    public SecretKey generateKey(){
       byte []  keyBytes = jwtSecrete.getBytes();
       return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username){

        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(generateKey(), SignatureAlgorithm.HS512)
                .compact();

    }

    public Claims extractClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(generateKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractSubject(String token){
      return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(String token){
        try {
            return !extractExpiration(token).before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Date extractExpiration(String token){
            return extractClaims(token).getExpiration();
    }



}
