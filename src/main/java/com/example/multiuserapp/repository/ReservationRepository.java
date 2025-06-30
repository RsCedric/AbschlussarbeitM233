package com.example.multiuserapp.repository;

import com.example.multiuserapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoomAndDateFromLessThanEqualAndDateToGreaterThanEqual(int room, LocalDate dateTo, LocalDate dateFrom);
    List<Reservation> findByRoomAndDateFromLessThanEqualAndDateToGreaterThanEqualAndFromTimeLessThanAndToTimeGreaterThan(
        int room, LocalDate dateTo, LocalDate dateFrom, LocalTime to, LocalTime from);
} 