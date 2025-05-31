package com.bank.IOBANK.filter;


import com.bank.IOBANK.entity.User;
import com.bank.IOBANK.jwt.JwtService;
import com.bank.IOBANK.repo.UserRepo;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepo userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

         String jwtToken = request.getHeader("Authorization");

        if (jwtToken == null || !jwtToken.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwtToken = jwtToken.substring(7); // strip "Bearer "

        if (!jwtService.isTokenValid(jwtToken)) {
            filterChain.doFilter(request, response);
            return;
        }

         String subject = jwtService.extractSubject(jwtToken);

         User user = (User) userDetailsService.loadUserByUsername(subject);

         var context = SecurityContextHolder.getContext();

         if (user != null && context.getAuthentication() == null){
             var authenticationToken = new UsernamePasswordAuthenticationToken(user,null,user.getAuthorities());

             authenticationToken.setDetails(request);
             context.setAuthentication(authenticationToken);
         }

         filterChain.doFilter(request, response);


    }
}
