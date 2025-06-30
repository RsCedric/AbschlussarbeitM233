package com.example.multiuserapp.service;

import com.example.multiuserapp.model.AdminUser;
import com.example.multiuserapp.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminUserService {
    @Autowired
    private AdminUserRepository adminUserRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public boolean authenticateAdmin(String username, String password) {
        Optional<AdminUser> adminOpt = adminUserRepository.findByUsername(username);
        System.out.println("Admin-Login-Versuch: username=" + username + ", gefunden=" + adminOpt.isPresent());
        if (adminOpt.isPresent()) {
            boolean match = passwordEncoder.matches(password, adminOpt.get().getPassword());
            System.out.println("Passwort-Match: " + match);
            return match;
        }
        return false;
    }

    public AdminUser findByUsername(String username) {
        return adminUserRepository.findByUsername(username).orElse(null);
    }
} 