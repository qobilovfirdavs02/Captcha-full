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

    @Autowired
    private CaptchaService captchaService; // CaptchaService injeksiya qilindi

    public User registerUser(User user, String recaptchaToken) {
        // reCAPTCHA tekshiruvi
        if (!captchaService.verifyCaptcha(recaptchaToken)) {
            throw new IllegalArgumentException("reCAPTCHA tasdiqlanmadi!");
        }

        // Username yoki email allaqachon mavjudligini tekshirish
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Bu username allaqachon ro‘yxatdan o‘tgan!");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Bu email allaqachon ro‘yxatdan o‘tgan!");
        }

        if (!isValidPassword(user.getPassword())) {
            throw new IllegalArgumentException("Parol talablarga mos emas!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public void resetPassword(String username, String oldPassword, String newPassword) {
        User user = userRepository.findByUsername(username).orElse(null);
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