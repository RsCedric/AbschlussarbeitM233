package com.example.M233Abschlussarbeit.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Future(message = "Datum muss in der Zukunft liegen")
    @NotNull(message = "Datum darf nicht leer sein")
    private LocalDate datum;

    @NotNull(message = "Startzeit darf nicht leer sein")
    private LocalTime von;

    @NotNull(message = "Endzeit darf nicht leer sein")
    private LocalTime bis;

    @Min(value = 101, message = "Zimmernummer muss zwischen 101 und 105 liegen")
    @Max(value = 105, message = "Zimmernummer muss zwischen 101 und 105 liegen")
    @NotNull(message = "Zimmernummer darf nicht leer sein")
    private int zimmernummer;

    @Size(min = 10, max = 200, message = "Bemerkung muss zwischen 10 und 200 Zeichen lang sein")
    @Pattern(regexp = "^[a-zA-Z0-9 ]*$", message = "Bemerkung darf nur alphanumerische Zeichen enthalten")
    @NotBlank(message = "Bemerkung darf nicht leer sein")
    private String bemerkung;

    @ElementCollection
    @CollectionTable(name = "teilnehmer", joinColumns = @JoinColumn(name = "reservation_id"))
    @Column(name = "teilnehmer")
    @NotEmpty(message = "Teilnehmerliste darf nicht leer sein")
    private List<String> teilnehmerliste;

    private String privateKey;
    private String publicKey;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDatum() {
        return datum;
    }

    public void setDatum(LocalDate datum) {
        this.datum = datum;
    }

    public LocalTime getVon() {
        return von;
    }

    public void setVon(LocalTime von) {
        this.von = von;
    }

    public LocalTime getBis() {
        return bis;
    }

    public void setBis(LocalTime bis) {
        this.bis = bis;
    }

    public int getZimmernummer() {
        return zimmernummer;
    }

    public void setZimmernummer(int zimmernummer) {
        this.zimmernummer = zimmernummer;
    }

    public String getBemerkung() {
        return bemerkung;
    }

    public void setBemerkung(String bemerkung) {
        this.bemerkung = bemerkung;
    }

    public List<String> getTeilnehmerliste() {
        return teilnehmerliste;
    }

    public void setTeilnehmerliste(List<String> teilnehmerliste) {
        this.teilnehmerliste = teilnehmerliste;
    }

    public String getPrivateKey() {
        return privateKey;
    }

    public void setPrivateKey(String privateKey) {
        this.privateKey = privateKey;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public void setPublicKey(String publicKey) {
        this.publicKey = publicKey;
    }
}