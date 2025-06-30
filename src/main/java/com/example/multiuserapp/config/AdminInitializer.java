package com.example.multiuserapp.config;

import com.example.multiuserapp.model.AdminUser;
import com.example.multiuserapp.repository.AdminUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer implements CommandLineRunner {
    @Autowired
    private AdminUserRepository adminUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        AdminUser admin = adminUserRepository.findByUsername("admin").orElse(null);
        if (admin == null) {
            admin = new AdminUser();
            admin.setUsername("admin");
            admin.setRole("ADMIN");
        }
        admin.setPassword(passwordEncoder.encode("admin123"));
        adminUserRepository.save(admin);
        System.out.println("Admin user (admin/admin123) wurde zurückgesetzt oder angelegt.");
    }
} 