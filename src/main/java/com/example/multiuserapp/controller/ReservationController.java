package com.example.multiuserapp.controller;

import com.example.multiuserapp.model.Reservation;
import com.example.multiuserapp.service.ReservationService;
import com.example.multiuserapp.model.User;
import com.example.multiuserapp.repository.UserRepository;
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

    @Autowired
    private UserRepository userRepository;

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
            Long userId = payload.get("userId") != null ? ((Number) payload.get("userId")).longValue() : null;
            System.out.println("UserId aus Payload: " + userId);
            User user = null;
            if (userId != null) {
                user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            }
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
            if (user != null) reservation.setUser(user);

            reservationService.saveReservation(reservation);
            System.out.println("Reservation gespeichert mit user_id: " + (reservation.getUser() != null ? reservation.getUser().getId() : null));
            return ResponseEntity.ok(Map.of("message", "Reservierung erfolgreich!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public List<Reservation> getReservations(@RequestParam int room, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return reservationService.getReservationsForRoomAndDate(room, date);
    }

    @GetMapping("/my-reservations")
    public ResponseEntity<?> getMyReservations(@RequestParam String userEmail) {
        try {
            List<Reservation> reservations = reservationService.getReservationsByUser(userEmail);
            return ResponseEntity.ok(reservations);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Long id, @RequestParam String userEmail) {
        try {
            boolean deleted = reservationService.deleteReservation(id, userEmail);
            if (deleted) {
                return ResponseEntity.ok(Map.of("message", "Reservierung erfolgreich gelöscht!"));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Reservierung nicht gefunden oder Sie haben keine Berechtigung zum Löschen!"));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservationsByUserId(@PathVariable Long userId) {
        System.out.println("API CALL: GET /api/reservations/user/" + userId);
        List<Reservation> result = reservationService.getReservationsByUserId(userId);
        System.out.println("Returned Reservations: " + result.size());
        return result;
    }

    @PatchMapping("/{reservationId}")
    public Reservation updateReservation(@PathVariable Long reservationId, @RequestBody Reservation updatedReservation) {
        System.out.println("API CALL: PATCH /api/reservations/" + reservationId);
        Reservation res = reservationService.updateReservation(reservationId, updatedReservation);
        System.out.println("Updated Reservation: " + res.getId());
        return res;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.getReservationById(id);
        if (reservation != null) {
            return ResponseEntity.ok(reservation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }
} 