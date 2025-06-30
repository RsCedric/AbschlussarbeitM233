package com.example.multiuserapp.controller;

import com.example.multiuserapp.model.Reservation;
import com.example.multiuserapp.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Map<String, Object> payload) {
        try {
            int room = (int) payload.get("room");
            String dateFromStr = (String) payload.get("dateFrom");
            String dateToStr = (String) payload.get("dateTo");
            String fromStr = (String) payload.get("from");
            String toStr = (String) payload.get("to");
            int participants = (int) payload.get("participants");
            String remark = payload.get("remark") != null ? (String) payload.get("remark") : "";
            Map<String, String> booker = (Map<String, String>) payload.get("booker");

            LocalDate dateFrom = LocalDate.parse(dateFromStr);
            LocalDate dateTo = LocalDate.parse(dateToStr);
            LocalTime from = LocalTime.parse(fromStr);
            LocalTime to = LocalTime.parse(toStr);

            if (!reservationService.isRoomAvailable(room, dateFrom, dateTo, from, to)) {
                return ResponseEntity.badRequest().body(Map.of("error", "Raum ist im gewünschten Zeitraum bereits belegt!"));
            }

            Reservation reservation = new Reservation();
            reservation.setRoom(room);
            reservation.setDateFrom(dateFrom);
            reservation.setDateTo(dateTo);
            reservation.setFromTime(from);
            reservation.setToTime(to);
            reservation.setParticipants(participants);
            reservation.setRemark(remark);
            reservation.setBookerName(booker.get("name"));
            reservation.setBookerAddress(booker.get("address"));
            reservation.setBookerEmail(booker.get("email"));

            reservationService.saveReservation(reservation);
            return ResponseEntity.ok(Map.of("message", "Reservierung erfolgreich!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public List<Reservation> getReservations(@RequestParam int room, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return reservationService.getReservationsForRoomAndDate(room, date);
    }
} 