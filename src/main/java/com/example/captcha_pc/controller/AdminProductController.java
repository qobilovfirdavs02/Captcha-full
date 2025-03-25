package com.example.captcha_pc.controller;

import com.example.captcha_pc.model.AdminProduct;
import com.example.captcha_pc.service.AdminProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200") // Frontend uchun CORS
public class AdminProductController {

    @Autowired
    private AdminProductService productService;

    @GetMapping
    public List<AdminProduct> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<AdminProduct> addProduct(@RequestBody AdminProduct product) {
        AdminProduct savedProduct = productService.addProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminProduct> updateProduct(@PathVariable("id") Long productId, @RequestBody AdminProduct product) {
        AdminProduct updatedProduct = productService.updateProduct(productId, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }
}