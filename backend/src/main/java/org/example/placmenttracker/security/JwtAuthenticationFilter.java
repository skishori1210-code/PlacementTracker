package org.example.placmenttracker.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {


    @Autowired
    private JwtService jwtService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        // =====================================
        // GET AUTHORIZATION HEADER
        // =====================================

        String authorizationHeader =
                request.getHeader("Authorization");


        // =====================================
        // NO TOKEN
        // =====================================

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }


        // =====================================
        // GET TOKEN
        // =====================================

        String token =
                authorizationHeader.substring(7);


        try {

            // =================================
            // VALIDATE TOKEN
            // =================================

            if (jwtService.isTokenValid(token)) {


                // =============================
                // GET EMAIL
                // =============================

                String email =
                        jwtService.extractEmail(token);


                // =============================
                // GET ROLE
                // =============================

                String role =
                        jwtService.extractRole(token);


                System.out.println(
                        "JWT Email: " + email
                );

                System.out.println(
                        "JWT Role: " + role
                );


                // =============================
                // CHECK VALUES
                // =============================

                if (email == null ||
                        role == null) {

                    throw new RuntimeException(
                            "JWT email or role is missing"
                    );
                }


                // =============================
                // CREATE AUTHORITY
                // =============================

                SimpleGrantedAuthority authority =
                        new SimpleGrantedAuthority(
                                "ROLE_" + role
                        );


                // =============================
                // CREATE AUTHENTICATION
                // =============================

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                Collections.singletonList(
                                        authority
                                )
                        );


                // =============================
                // SET SECURITY CONTEXT
                // =============================

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(
                                authentication
                        );


                System.out.println(
                        "Authentication set successfully"
                );
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT Error: " + e.getMessage()
            );

            SecurityContextHolder
                    .clearContext();
        }


        // =====================================
        // CONTINUE FILTER CHAIN
        // =====================================

        filterChain.doFilter(
                request,
                response
        );
    }
}