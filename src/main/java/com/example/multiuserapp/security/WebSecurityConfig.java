package com.example.multiuserapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration // Diese Klasse ist eine Konfigurationsklasse für Spring
@EnableWebSecurity // Aktiviert die Web-Sicherheitsfunktionen von Spring Security
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Hauptkonfiguration für HTTP-Sicherheit:
        http
            .csrf().disable() // Deaktiviert CSRF-Schutz (z.B. für APIs oft üblich)
            .cors().and() // Aktiviert CORS (Cross-Origin Resource Sharing)
            .authorizeHttpRequests() // Startet die Definition von Zugriffsregeln
                .requestMatchers("/api/admin/login").permitAll() // /api/admin/login ist für alle offen
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN") // Alle anderen /api/admin-Endpunkte nur für Admins
                .anyRequest().permitAll() // Alle anderen Endpunkte sind für alle offen
            .and()
            .httpBasic(); // Nutzt HTTP Basic Authentifizierung (später evtl. JWT)
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        // Stellt einen Passwort-Encoder bereit, der Passwörter sicher mit BCrypt hasht
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        // Konfiguriert CORS: Von wo aus dürfen Anfragen an die API gestellt werden?
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3001"); // Erlaubt Anfragen vom Frontend (Port 3001)
        configuration.addAllowedMethod("*"); // Erlaubt alle HTTP-Methoden (GET, POST, ...)
        configuration.addAllowedHeader("*"); // Erlaubt alle Header
        configuration.setAllowCredentials(true); // Erlaubt das Senden von Cookies/Credentials
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Gilt für alle Pfade
        return source;
    }
} 