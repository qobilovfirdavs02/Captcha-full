package com.example.captcha_pc.controller;

import com.example.captcha_pc.entity.Product;
import com.example.captcha_pc.entity.User;
import com.example.captcha_pc.service.ProductService;
import com.example.captcha_pc.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Map<String, Object> request) {
        try {
            User user = new User();
            user.setUsername((String) request.get("username"));
            user.setEmail((String) request.get("email"));
            user.setPassword((String) request.get("password"));
            String recaptchaToken = (String) request.get("recaptchaToken");
            userService.registerUser(user, recaptchaToken);
            return ResponseEntity.ok("User registered successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
        User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
        if (loggedInUser != null) {
            session.setAttribute("user", loggedInUser);
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Login failed: Invalid username or password");
        }
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getUserProducts(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(401).body(null);
        }
        List<Product> products = productService.getUserProducts(user);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }
}