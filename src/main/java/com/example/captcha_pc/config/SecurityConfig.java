package com.example.captcha_pc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // CSRF ni o‘chirish
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS sozlamasi
                .authorizeHttpRequests(auth -> auth // authorizeRequests o‘rniga authorizeHttpRequests
                        .requestMatchers("/api/register", "/api/login", "/api/profile").permitAll() // Ruxsat berilgan endpointlar
                        .anyRequest().authenticated() // Qolganlarga autentifikatsiya talab qilinadi
                )
                .formLogin(form -> form.disable()) // Form login o‘chirish
                .httpBasic(basic -> basic.disable()); // HTTP Basic o‘chirish

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200")); // Frontend manzili
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Barcha metodlar
        configuration.setAllowedHeaders(List.of("*")); // Barcha sarlavhalarga ruxsat
        configuration.setAllowCredentials(true); // Cookie yoki autentifikatsiya uchun

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Barcha endpointlar uchun
        return source;
    }
}