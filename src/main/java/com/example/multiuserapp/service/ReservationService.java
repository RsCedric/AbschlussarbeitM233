package com.example.multiuserapp.service;

import com.example.multiuserapp.model.Reservation;
import com.example.multiuserapp.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public boolean isRoomAvailable(int room, LocalDate date, LocalTime from, LocalTime to) {
        List<Reservation> overlapping = reservationRepository.findByRoomAndDateAndFromTimeLessThanAndToTimeGreaterThan(
            room, date, to, from
        );
        return overlapping.isEmpty();
    }

    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsForRoomAndDate(int room, LocalDate date) {
        return reservationRepository.findByRoomAndDate(room, date);
    }
} 