package com.example.multiuserapp.repository;

import com.example.multiuserapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByRoomAndDate(int room, LocalDate date);
    List<Reservation> findByRoomAndDateAndFromTimeLessThanAndToTimeGreaterThan(int room, LocalDate date, LocalTime to, LocalTime from);
} 