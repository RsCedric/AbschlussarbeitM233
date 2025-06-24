package com.example.M233Abschlussarbeit.service;

import com.example.M233Abschlussarbeit.model.Reservation;
import com.example.M233Abschlussarbeit.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation createReservation(Reservation reservation) {
        if (isRoomAvailable(reservation)) {
            reservation.setPrivateKey(generateKey());
            reservation.setPublicKey(generateKey());
            return reservationRepository.save(reservation);
        } else {
            throw new IllegalStateException("Zimmer ist zur angegebenen Zeit nicht verfügbar");
        }
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationByPublicKey(String publicKey) {
        return reservationRepository.findByPublicKey(publicKey);
    }

    public Reservation updateReservation(String privateKey, Reservation reservation) {
        Reservation existingReservation = reservationRepository.findByPrivateKey(privateKey);
        if (existingReservation != null) {
            existingReservation.setDatum(reservation.getDatum());
            existingReservation.setVon(reservation.getVon());
            existingReservation.setBis(reservation.getBis());
            existingReservation.setBemerkung(reservation.getBemerkung());
            existingReservation.setTeilnehmerliste(reservation.getTeilnehmerliste());
            return reservationRepository.save(existingReservation);
        }
        return null;
    }

    public void deleteReservation(String privateKey) {
        Reservation existingReservation = reservationRepository.findByPrivateKey(privateKey);
        if (existingReservation != null) {
            reservationRepository.delete(existingReservation);
        }
    }

    private boolean isRoomAvailable(Reservation reservation) {
        List<Reservation> overlappingReservations = reservationRepository.findByZimmernummerAndDatumAndVonIsLessThanAndBisIsGreaterThan(
                reservation.getZimmernummer(),
                reservation.getDatum(),
                reservation.getBis(),
                reservation.getVon()
        );
        return overlappingReservations.isEmpty();
    }

    private String generateKey() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
} 