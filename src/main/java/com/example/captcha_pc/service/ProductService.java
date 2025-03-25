package com.example.captcha_pc.service;

import com.example.captcha_pc.entity.Product;
import com.example.captcha_pc.entity.User;
import com.example.captcha_pc.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getUserProducts(User user) {
        return productRepository.findByUser(user);
    }
}