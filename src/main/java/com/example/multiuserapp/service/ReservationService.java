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

    public List<Reservation> getReservationsByUserId(Long userId) {
        return reservationRepository.findByUser_Id(userId);
    }

    public void deleteReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public Reservation updateReservation(Long reservationId, Reservation updatedReservation) {
        Reservation existing = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        existing.setRoom(updatedReservation.getRoom());
        existing.setDateFrom(updatedReservation.getDateFrom());
        existing.setDateTo(updatedReservation.getDateTo());
        existing.setFromTime(updatedReservation.getFromTime());
        existing.setToTime(updatedReservation.getToTime());
        existing.setParticipants(updatedReservation.getParticipants());
        existing.setRemark(updatedReservation.getRemark());
        // Optional: Booker Infos
        existing.setBookerName(updatedReservation.getBookerName());
        existing.setBookerAddress(updatedReservation.getBookerAddress());
        existing.setBookerEmail(updatedReservation.getBookerEmail());
        return reservationRepository.save(existing);
    }

    public Reservation getReservationById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }
} 