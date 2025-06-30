import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Box, Typography, Button, TextField, CircularProgress, MenuItem, Grid } from "@mui/material";

const ROOMS = [
  { number: 101, capacity: 4 },
  { number: 102, capacity: 6 },
  { number: 103, capacity: 8 },
  { number: 104, capacity: 10 },
  { number: 105, capacity: 12 },
];

const EditReservationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (location.state && location.state.reservation) {
      setReservation(location.state.reservation);
    } else {
      setLoading(true);
      axios.get(`/reservations/${id}`)
        .then(res => setReservation(res.data))
        .catch(() => setError("Fehler beim Laden der Buchung."))
        .finally(() => setLoading(false));
    }
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.patch(`/reservations/${id}`, reservation);
      setSuccess("Buchung erfolgreich aktualisiert!");
      setTimeout(() => navigate("/meine-buchungen"), 1000);
    } catch {
      setError("Fehler beim Aktualisieren der Buchung.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !reservation) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const maxCapacity = ROOMS.find(r => r.number === Number(reservation.room))?.capacity || 12;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Buchung bearbeiten</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Zimmernummer"
          name="room"
          value={reservation.room}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {ROOMS.map((r) => (
            <MenuItem key={r.number} value={r.number}>
              Zimmer {r.number} (max. {r.capacity} Personen)
            </MenuItem>
          ))}
        </TextField>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Von-Datum"
              type="date"
              name="dateFrom"
              value={reservation.dateFrom}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Bis-Datum"
              type="date"
              name="dateTo"
              value={reservation.dateTo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Von (HH:MM)"
              type="time"
              name="fromTime"
              value={reservation.fromTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Bis (HH:MM)"
              type="time"
              name="toTime"
              value={reservation.toTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <TextField
          label={`Anzahl Teilnehmer (max. ${maxCapacity})`}
          type="number"
          name="participants"
          value={reservation.participants}
          onChange={handleChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1, max: maxCapacity }}
        />
        <TextField
          label="Bemerkung (optional)"
          name="remark"
          value={reservation.remark}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          minRows={2}
          inputProps={{ maxLength: 200 }}
        />
        {success && <div style={{ color: "green", marginBottom: 10 }}>{success}</div>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Änderungen speichern
        </Button>
      </form>
    </Box>
  );
};

export default EditReservationPage; 