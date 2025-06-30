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
        return adminOpt.isPresent() && passwordEncoder.matches(password, adminOpt.get().getPassword());
    }

    public AdminUser findByUsername(String username) {
        return adminUserRepository.findByUsername(username).orElse(null);
    }
} 