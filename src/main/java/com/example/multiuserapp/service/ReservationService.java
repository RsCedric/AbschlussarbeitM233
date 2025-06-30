package com.example.multiuserapp.service;

import com.example.multiuserapp.model.Reservation;
import com.example.multiuserapp.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public boolean isRoomAvailable(int room, LocalDate dateFrom, LocalDate dateTo, LocalTime from, LocalTime to) {
        // Für jeden Tag im Zeitraum prüfen, ob es eine Überschneidung gibt
        LocalDate d = dateFrom;
        while (!d.isAfter(dateTo)) {
            List<Reservation> overlapping = reservationRepository.findByRoomAndDateFromLessThanEqualAndDateToGreaterThanEqualAndFromTimeLessThanAndToTimeGreaterThan(
                room, d, d, to, from
            );
            if (!overlapping.isEmpty()) {
                return false;
            }
            d = d.plusDays(1);
        }
        return true;
    }

    public Reservation saveReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsForRoomAndDate(int room, LocalDate date) {
        return reservationRepository.findByRoomAndDateFromLessThanEqualAndDateToGreaterThanEqual(room, date, date);
    }

    public List<Reservation> getReservationsByUser(String bookerEmail) {
        return reservationRepository.findByBookerEmail(bookerEmail);
    }

    public boolean deleteReservation(Long reservationId, String userEmail) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (reservation.isPresent() && reservation.get().getBookerEmail().equals(userEmail)) {
            reservationRepository.deleteById(reservationId);
            return true;
        }
        return false;
    }
} 