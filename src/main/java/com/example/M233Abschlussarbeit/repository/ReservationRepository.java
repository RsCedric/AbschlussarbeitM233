package com.example.M233Abschlussarbeit.repository;

import com.example.M233Abschlussarbeit.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByZimmernummerAndDatumAndVonIsLessThanAndBisIsGreaterThan(
            int zimmernummer, LocalDate datum, LocalTime bis, LocalTime von);

    Reservation findByPublicKey(String publicKey);
    Reservation findByPrivateKey(String privateKey);
} 