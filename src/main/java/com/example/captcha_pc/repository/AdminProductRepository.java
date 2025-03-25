package com.example.captcha_pc.repository;

import com.example.captcha_pc.model.AdminProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminProductRepository extends JpaRepository<AdminProduct, Long> {
}