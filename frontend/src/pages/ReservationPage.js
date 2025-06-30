import React, { useState, useContext } from "react";
import { Box, Button, TextField, MenuItem, Typography, Grid } from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ROOMS = [
  { number: 101, capacity: 4 },
  { number: 102, capacity: 6 },
  { number: 103, capacity: 8 },
  { number: 104, capacity: 10 },
  { number: 105, capacity: 12 },
];

const ReservationPage = () => {
  const [room, setRoom] = useState(ROOMS[0].number);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [participants, setParticipants] = useState(1);
  const [booker, setBooker] = useState({ name: "", address: "", email: "" });
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const maxCapacity = ROOMS.find((r) => r.number === Number(room)).capacity;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleBookerField = (field, value) => {
    setBooker((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!dateFrom || !dateTo || !from || !to) {
      setError("Bitte Zeitraum und Uhrzeiten angeben.");
      return;
    }
    if (dateFrom > dateTo) {
      setError("Das Von-Datum darf nicht nach dem Bis-Datum liegen.");
      return;
    }
    if (remark.length > 0 && (remark.length < 10 || remark.length > 200)) {
      setError("Bemerkung muss zwischen 10 und 200 Zeichen lang sein, wenn sie ausgefüllt wird.");
      return;
    }
    if (!booker.name || !booker.address || !booker.email) {
      setError("Bitte Name, Adresse und E-Mail des Buchenden angeben.");
      return;
    }
    try {
      await api.post("/reservations", {
        room,
        dateFrom,
        dateTo,
        from,
        to,
        remark,
        participants,
        booker,
        userId: user.id
      });
      setSuccess("Reservierung erfolgreich!");
      setTimeout(() => {
        navigate("/rooms?tab=my");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Reservierung fehlgeschlagen");
    }
  };

  return (
    <Box sx={{
      maxWidth: 600,
      mx: "auto",
      mt: 4,
      p: 4,
      borderRadius: 4,
      boxShadow: '0 2px 12px 0 #00000033',
      background: 'linear-gradient(90deg, #232323 60%, #181818 100%)',
      border: '1.5px solid',
      borderColor: 'primary.main',
      position: 'relative',
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', textShadow: 'none', fontWeight: 600 }}>
        Reservation erstellen
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Zimmernummer"
          value={room}
          onChange={e => setRoom(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
              fontWeight: 400,
              background: '#181818',
              borderRadius: 2,
            },
            '& .MuiInputLabel-root': {
              color: 'primary.main',
              fontWeight: 500,
            },
          }}
        >
          {ROOMS.map((r) => (
            <MenuItem key={r.number} value={r.number} sx={{ color: 'primary.main', fontWeight: 500 }}>
              Zimmer {r.number} (max. {r.capacity} Personen)
            </MenuItem>
          ))}
        </TextField>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Von-Datum"
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#181818', borderRadius: 2, fontWeight: 400 },
                '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Bis-Datum"
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#181818', borderRadius: 2, fontWeight: 400 },
                '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
              }}
            />
          </Grid>
        </Grid>
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
              sx={{
                '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#181818', borderRadius: 2, fontWeight: 400 },
                '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
              }}
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
              sx={{
                '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#181818', borderRadius: 2, fontWeight: 400 },
                '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
              }}
            />
          </Grid>
        </Grid>
        <TextField
          label={`Anzahl Teilnehmer (max. ${maxCapacity})`}
          type="number"
          value={participants}
          onChange={e => setParticipants(Math.max(1, Math.min(maxCapacity, Number(e.target.value))))}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: maxCapacity }}
          sx={{
            '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#181818', borderRadius: 2, fontWeight: 400 },
            '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
          }}
        />
        <Box sx={{ border: "1px solid #ff00cc33", borderRadius: 2, p: 2, mb: 2, background: '#181818' }}>
          <Typography variant="subtitle1" color="primary.main" sx={{ mb: 1, fontWeight: 500 }}>
            Buchende Person
          </Typography>
          <TextField
            label="Name"
            value={booker.name}
            onChange={e => handleBookerField("name", e.target.value)}
            fullWidth
            margin="dense"
            required
            sx={{
              '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#232323', borderRadius: 2, fontWeight: 400 },
              '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
            }}
          />
          <TextField
            label="Adresse"
            value={booker.address}
            onChange={e => handleBookerField("address", e.target.value)}
            fullWidth
            margin="dense"
            required
            sx={{
              '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#232323', borderRadius: 2, fontWeight: 400 },
              '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
            }}
          />
          <TextField
            label="E-Mail"
            type="email"
            value={booker.email}
            onChange={e => handleBookerField("email", e.target.value)}
            fullWidth
            margin="dense"
            required
            sx={{
              '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#232323', borderRadius: 2, fontWeight: 400 },
              '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
            }}
          />
        </Box>
        <TextField
          label="Bemerkung (optional)"
          value={remark}
          onChange={e => setRemark(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          inputProps={{ maxLength: 200 }}
          sx={{
            '& .MuiOutlinedInput-root': { color: 'text.primary', background: '#181818', borderRadius: 2, fontWeight: 400 },
            '& .MuiInputLabel-root': { color: 'primary.main', fontWeight: 500 },
          }}
        />
        {error && <div style={{ color: "#ff1744", marginBottom: 10, fontWeight: 500 }}>{error}</div>}
        {success && <div style={{ color: "#00e676", marginBottom: 10, fontWeight: 500 }}>{success}</div>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            fontWeight: 600,
            fontSize: 20,
            background: 'linear-gradient(90deg, #ff00cc 0%, #fff 100%)',
            color: '#121212',
            boxShadow: '0 2px 12px 0 #00000033',
            borderRadius: 3,
            transition: 'transform 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #fff 0%, #ff00cc 100%)',
              transform: 'scale(1.04)',
              boxShadow: '0 4px 24px 0 #00000044',
            },
          }}
        >
          Reservieren
        </Button>
      </form>
    </Box>
  );
};

export default ReservationPage; 