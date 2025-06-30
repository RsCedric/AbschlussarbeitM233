package com.example.multiuserapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int room;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private LocalTime fromTime;
    private LocalTime toTime;
    private int participants;
    private String remark;

    // Booker Infos
    private String bookerName;
    private String bookerAddress;
    private String bookerEmail;

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public int getRoom() { return room; }
    public void setRoom(int room) { this.room = room; }
    public LocalDate getDateFrom() { return dateFrom; }
    public void setDateFrom(LocalDate dateFrom) { this.dateFrom = dateFrom; }
    public LocalDate getDateTo() { return dateTo; }
    public void setDateTo(LocalDate dateTo) { this.dateTo = dateTo; }
    public LocalTime getFromTime() { return fromTime; }
    public void setFromTime(LocalTime fromTime) { this.fromTime = fromTime; }
    public LocalTime getToTime() { return toTime; }
    public void setToTime(LocalTime toTime) { this.toTime = toTime; }
    public int getParticipants() { return participants; }
    public void setParticipants(int participants) { this.participants = participants; }
    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }
    public String getBookerName() { return bookerName; }
    public void setBookerName(String bookerName) { this.bookerName = bookerName; }
    public String getBookerAddress() { return bookerAddress; }
    public void setBookerAddress(String bookerAddress) { this.bookerAddress = bookerAddress; }
    public String getBookerEmail() { return bookerEmail; }
    public void setBookerEmail(String bookerEmail) { this.bookerEmail = bookerEmail; }
} 