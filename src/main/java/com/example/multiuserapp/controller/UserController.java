package com.example.multiuserapp.controller;

import com.example.multiuserapp.model.User;
import com.example.multiuserapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registered = userService.registerUser(user);
            return ResponseEntity.ok(Map.of("id", registered.getId(), "username", registered.getUsername()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            User user = userService.loginUser(loginData.get("username"), loginData.get("password"));
            return ResponseEntity.ok(Map.of(
                "id", user.getId(), 
                "username", user.getUsername(),
                "email", user.getEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 