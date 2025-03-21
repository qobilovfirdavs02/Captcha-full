package com.example.captcha_pc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Barcha endpointlar uchun
                        .allowedOrigins("http://localhost:4200") // Frontend manzili
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Barcha metodlar
                        .allowedHeaders("*") // Barcha sarlavhalarga ruxsat
                        .allowCredentials(true); // Cookie yoki autentifikatsiya uchun
            }
        };
    }
}