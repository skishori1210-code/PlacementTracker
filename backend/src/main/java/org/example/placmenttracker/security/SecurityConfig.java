package org.example.placmenttracker.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // =================================================
                // CORS
                // =================================================

                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))


                // =================================================
                // CSRF
                // =================================================

                .csrf(csrf -> csrf.disable())


                // =================================================
                // SESSION
                // =================================================

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )


                // =================================================
                // AUTHORIZATION
                // =================================================

                .authorizeHttpRequests(auth -> auth


                        // =================================================
                        // PUBLIC AUTH APIs
                        // =================================================

                        .requestMatchers(
                                "/auth/login",
                                "/auth/admin-login",
                                "/auth/register"
                        ).permitAll()


                        // =================================================
                        // CORS PREFLIGHT
                        // =================================================

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()


                        // =================================================
                        // STUDENT OWN PROFILE
                        // IMPORTANT:
                        // This MUST come BEFORE /students/**
                        // =================================================

                        .requestMatchers(
                                "/students/me"
                        ).hasRole("STUDENT")


                        // =================================================
                        // ADMIN STUDENT MANAGEMENT
                        // =================================================

                        .requestMatchers(
                                "/students/**"
                        ).hasRole("ADMIN")


                        // =================================================
                        // ADMIN COMPANY MANAGEMENT
                        // =================================================

                        .requestMatchers(
                                "/companies/**"
                        ).hasRole("ADMIN")


                        // =================================================
                        // JOB APIs
                        // =================================================

                        .requestMatchers(
                                "/jobs/**"
                        ).authenticated()


                        // =================================================
                        // APPLICATION APIs
                        // =================================================

                        .requestMatchers(
                                "/applications/**"
                        ).authenticated()


                        // =================================================
                        // EVERYTHING ELSE
                        // =================================================

                        .anyRequest().authenticated()
                )


                // =================================================
                // JWT FILTER
                // =================================================

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );


        return http.build();
    }


    // =====================================================
    // CORS CONFIGURATION
    // =====================================================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();


        // -----------------------------------------------------
        // React Vite ports
        // -----------------------------------------------------

        configuration.setAllowedOrigins(
                Arrays.asList(
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "http://localhost:5175"
                )
        );


        // -----------------------------------------------------
        // Allowed HTTP methods
        // -----------------------------------------------------

        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "PATCH",
                        "OPTIONS"
                )
        );


        // -----------------------------------------------------
        // Allowed headers
        // -----------------------------------------------------

        configuration.setAllowedHeaders(
                Arrays.asList("*")
        );


        // -----------------------------------------------------
        // Allow Authorization header / credentials
        // -----------------------------------------------------

        configuration.setAllowCredentials(true);


        // -----------------------------------------------------
        // Register CORS configuration
        // -----------------------------------------------------

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();


        source.registerCorsConfiguration(
                "/**",
                configuration
        );


        return source;
    }
}