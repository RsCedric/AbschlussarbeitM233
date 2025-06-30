package com.example.multiuserapp.repository;

import com.example.multiuserapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoomAndDateFromLessThanEqualAndDateToGreaterThanEqual(int room, LocalDate date, LocalDate date2);
    List<Reservation> findByRoomAndDateFromLessThanEqualAndDateToGreaterThanEqualAndFromTimeLessThanAndToTimeGreaterThan(
        int room, LocalDate date, LocalDate date2, LocalTime to, LocalTime from);
    List<Reservation> findByBookerEmail(String bookerEmail);
    List<Reservation> findByUser_Id(Long userId);
} 