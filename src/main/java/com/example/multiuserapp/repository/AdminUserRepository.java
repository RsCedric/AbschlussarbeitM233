package com.example.multiuserapp.repository;

import com.example.multiuserapp.model.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
 
public interface AdminUserRepository extends JpaRepository<AdminUser, Long> {
    Optional<AdminUser> findByUsername(String username);
} 