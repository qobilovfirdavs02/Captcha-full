package com.example.captcha_pc.controller;

import com.example.captcha_pc.entity.Admin;
import com.example.captcha_pc.service.CaptchaService;
import com.example.captcha_pc.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private CaptchaService captchaService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        if (!captchaService.verifyCaptcha(request.getCaptchaResponse())) {
            return ResponseEntity.badRequest().body(Map.of("error", "reCAPTCHA tasdiqlanmadi!"));
        }

        Admin admin = new Admin();
        admin.setEmail(request.getEmail());
        admin.setPassword(request.getPassword());

        try {
            adminService.registerAdmin(admin);
            return ResponseEntity.ok(Map.of("message", "Ro‘yxatdan o‘tish muvaffaqiyatli!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Server xatosi: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody Admin loginAdmin) {
        Admin admin = adminService.loginAdmin(loginAdmin.getEmail(), loginAdmin.getPassword());
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/profile")
    public ResponseEntity<Admin> getProfile(@RequestParam String email) {
        Admin admin = adminService.getAdminByEmail(email);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.status(404).body(null);
    }

    @PostMapping("/password-reset")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            adminService.resetPassword(request.getEmail(), request.getOldPassword(), request.getNewPassword());  // static emas, endi to'g'ri chaqirishingiz mumkin
            return ResponseEntity.ok(Map.of("message", "Parol muvaffaqiyatli almashtirildi!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Server xatosi",
                    "details", e.getMessage()
            ));
        }
    }

}

class RegisterRequest {
    private String email;
    private String password;
    private String captchaResponse;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getCaptchaResponse() { return captchaResponse; }
    public void setCaptchaResponse(String captchaResponse) { this.captchaResponse = captchaResponse; }
}

class PasswordResetRequest {
    private String email;
    private String oldPassword;
    private String newPassword;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}