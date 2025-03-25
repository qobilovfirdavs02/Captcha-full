package com.example.captcha_pc.service;

import com.example.captcha_pc.entity.Admin;
import com.example.captcha_pc.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;  // static ni olib tashladik

    @Autowired
    private PasswordEncoder passwordEncoder;  // static ni olib tashladik

    public Admin registerAdmin(Admin admin) {
        // Email allaqachon mavjudligini tekshirish
        if (adminRepository.findByEmail(admin.getEmail()) != null) {
            throw new IllegalArgumentException("Bu email allaqachon ro‘yxatdan o‘tgan!");
        }

        if (!isValidPassword(admin.getPassword())) {
            throw new IllegalArgumentException("Parol talablarga mos emas!");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);  // AdminRepository.save -> adminRepository.save
    }

    public Admin loginAdmin(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null;
    }

    public Admin getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public void resetPassword(String email, String oldPassword, String newPassword) {  // static ni olib tashladik
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) {
            throw new IllegalArgumentException("Foydalanuvchi topilmadi!");
        }
        if (!passwordEncoder.matches(oldPassword, admin.getPassword())) {
            throw new IllegalArgumentException("Eski parol noto‘g‘ri!");
        }
        if (!isValidPassword(newPassword)) {
            throw new IllegalArgumentException("Yangi parol talablarga mos emas!");
        }
        admin.setPassword(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);
    }


    private boolean isValidPassword(String password) {  // static ni olib tashladik
        return password.length() >= 8 &&
                password.matches(".*[A-Z].*") &&
                password.matches(".*[a-z].*") &&
                password.matches(".*[0-9].*") &&
                password.matches(".*[!@#$%^&*].*");
    }
}
