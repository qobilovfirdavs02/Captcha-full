package com.example.captcha_pc.controller;

import com.example.captcha_pc.entity.User;
import com.example.captcha_pc.service.CaptchaService;
import com.example.captcha_pc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private CaptchaService captchaService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegisterRequest request) {
        if (!captchaService.verifyCaptcha(request.getCaptchaResponse())) {
            return ResponseEntity.badRequest().body(Map.of("error", "reCAPTCHA tasdiqlanmadi!"));
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        try {
            userService.registerUser(user);
            return ResponseEntity.ok(Map.of("message", "Ro‘yxatdan o‘tish muvaffaqiyatli!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Server xatosi: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginUser) {
        User user = userService.loginUser(loginUser.getEmail(), loginUser.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(@RequestParam String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).body(null);
    }

    @PostMapping("/password-reset")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            userService.resetPassword(request.getEmail(), request.getOldPassword(), request.getNewPassword());
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