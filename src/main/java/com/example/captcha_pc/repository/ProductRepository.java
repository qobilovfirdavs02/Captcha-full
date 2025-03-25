package com.example.captcha_pc.repository;

import com.example.captcha_pc.entity.Product;
import com.example.captcha_pc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUser(User user);
}