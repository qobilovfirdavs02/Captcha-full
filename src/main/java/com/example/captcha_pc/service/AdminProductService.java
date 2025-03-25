package com.example.captcha_pc.service;

import com.example.captcha_pc.model.AdminProduct;
import com.example.captcha_pc.repository.AdminProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminProductService {

    @Autowired
    private AdminProductRepository productRepository;

    public List<AdminProduct> getAllProducts() {
        return productRepository.findAll();
    }

    public AdminProduct addProduct(AdminProduct product) {
        return productRepository.save(product);
    }

    public AdminProduct updateProduct(Long productId, AdminProduct product) {
        Optional<AdminProduct> existingProduct = productRepository.findById(productId);
        if (existingProduct.isPresent()) {
            AdminProduct updatedProduct = existingProduct.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setDescription(product.getDescription());
            updatedProduct.setPrice(product.getPrice());
            updatedProduct.setStock(product.getStock());
            updatedProduct.setImageUrls(product.getImageUrls());
            return productRepository.save(updatedProduct);
        } else {
            throw new RuntimeException("Mahsulot topilmadi: " + productId);
        }
    }

    public void deleteProduct(Long productId) {
        if (productRepository.existsById(productId)) {
            productRepository.deleteById(productId);
        } else {
            throw new RuntimeException("Mahsulot topilmadi: " + productId);
        }
    }
}