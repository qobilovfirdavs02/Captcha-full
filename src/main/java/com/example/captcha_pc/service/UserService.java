package com.example.captcha_pc.service;

import com.example.captcha_pc.entity.User;
import com.example.captcha_pc.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        // Email allaqachon mavjudligini tekshirish
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("Bu email allaqachon ro‘yxatdan o‘tgan!");
        }

        if (!isValidPassword(user.getPassword())) {
            throw new IllegalArgumentException("Parol talablarga mos emas!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void resetPassword(String email, String oldPassword, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Foydalanuvchi topilmadi!");
        }
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IllegalArgumentException("Eski parol noto‘g‘ri!");
        }
        if (!isValidPassword(newPassword)) {
            throw new IllegalArgumentException("Yangi parol talablarga mos emas!");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private boolean isValidPassword(String password) {
        return password.length() >= 8 &&
                password.matches(".*[A-Z].*") &&
                password.matches(".*[a-z].*") &&
                password.matches(".*[0-9].*") &&
                password.matches(".*[!@#$%^&*].*");
    }
}