import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography, Grid } from "@mui/material";
import api from "../api/axios";

const ROOMS = [
  { number: 101, capacity: 4 },
  { number: 102, capacity: 6 },
  { number: 103, capacity: 8 },
  { number: 104, capacity: 10 },
  { number: 105, capacity: 12 },
];

const ReservationPage = () => {
  const [room, setRoom] = useState(ROOMS[0].number);
  const [date, setDate] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [participants, setParticipants] = useState(1);
  const [participantData, setParticipantData] = useState([
    { name: "", address: "", email: "" },
  ]);
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const maxCapacity = ROOMS.find((r) => r.number === Number(room)).capacity;

  const handleParticipantsChange = (e) => {
    const value = Math.max(1, Math.min(maxCapacity, Number(e.target.value)));
    setParticipants(value);
    setParticipantData((prev) => {
      const arr = [...prev];
      while (arr.length < value) arr.push({ name: "", address: "", email: "" });
      while (arr.length > value) arr.pop();
      return arr;
    });
  };

  const handleParticipantField = (idx, field, value) => {
    setParticipantData((prev) => {
      const arr = [...prev];
      arr[idx][field] = value;
      return arr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validierung
    if (!date || !from || !to) {
      setError("Bitte Datum und Uhrzeiten angeben.");
      return;
    }
    if (remark.length < 10 || remark.length > 200) {
      setError("Bemerkung muss zwischen 10 und 200 Zeichen lang sein.");
      return;
    }
    for (let p of participantData) {
      if (!p.name || !p.address || !p.email) {
        setError("Alle Teilnehmerdaten müssen ausgefüllt sein.");
        return;
      }
    }
    try {
      await api.post("/reservations", {
        room,
        date,
        from,
        to,
        remark,
        participants: participantData,
      });
      setSuccess("Reservierung erfolgreich!");
    } catch (err) {
      setError(err.response?.data?.error || "Reservierung fehlgeschlagen");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Reservation erstellen</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Zimmernummer"
          value={room}
          onChange={e => setRoom(e.target.value)}
          fullWidth
          margin="normal"
        >
          {ROOMS.map((r) => (
            <MenuItem key={r.number} value={r.number}>
              Zimmer {r.number} (max. {r.capacity} Personen)
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Datum"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Von (HH:MM)"
              type="time"
              value={from}
              onChange={e => setFrom(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bis (HH:MM)"
              type="time"
              value={to}
              onChange={e => setTo(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <TextField
          label={`Anzahl Teilnehmer (max. ${maxCapacity})`}
          type="number"
          value={participants}
          onChange={handleParticipantsChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: maxCapacity }}
        />
        {participantData.map((p, idx) => (
          <Box key={idx} sx={{ border: "1px solid #eee", borderRadius: 1, p: 2, mb: 2 }}>
            <Typography variant="subtitle1">Teilnehmer {idx + 1}</Typography>
            <TextField
              label="Name"
              value={p.name}
              onChange={e => handleParticipantField(idx, "name", e.target.value)}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              label="Adresse"
              value={p.address}
              onChange={e => handleParticipantField(idx, "address", e.target.value)}
              fullWidth
              margin="dense"
              required
            />
            <TextField
              label="E-Mail"
              type="email"
              value={p.email}
              onChange={e => handleParticipantField(idx, "email", e.target.value)}
              fullWidth
              margin="dense"
              required
            />
          </Box>
        ))}
        <TextField
          label="Bemerkung"
          value={remark}
          onChange={e => setRemark(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          inputProps={{ minLength: 10, maxLength: 200 }}
        />
        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 10 }}>{success}</div>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Reservieren
        </Button>
      </form>
    </Box>
  );
};

export default ReservationPage; 