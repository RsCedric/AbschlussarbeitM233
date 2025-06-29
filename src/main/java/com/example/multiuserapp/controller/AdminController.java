package com.example.multiuserapp.controller;

import com.example.multiuserapp.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminUserService adminUserService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        boolean authenticated = adminUserService.authenticateAdmin(username, password);
        if (authenticated) {
            // TODO: JWT Token generieren und zurückgeben
            return ResponseEntity.ok(Map.of("token", "FAKE_JWT_TOKEN"));
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
} 