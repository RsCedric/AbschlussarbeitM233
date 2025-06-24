package com.example.M233Abschlussarbeit.controller;

import com.example.M233Abschlussarbeit.model.Reservation;
import com.example.M233Abschlussarbeit.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody Reservation reservation) {
        Reservation createdReservation = reservationService.createReservation(reservation);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{publicKey}")
    public ResponseEntity<Reservation> getReservationByPublicKey(@PathVariable String publicKey) {
        Reservation reservation = reservationService.getReservationByPublicKey(publicKey);
        if (reservation != null) {
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{privateKey}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable String privateKey, @Valid @RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(privateKey, reservation);
        if (updatedReservation != null) {
            return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{privateKey}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String privateKey) {
        reservationService.deleteReservation(privateKey);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
} 