import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, List, ListItem, ListItemText, Chip, Grid } from "@mui/material";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  { number: 101, capacity: 4 },
  { number: 102, capacity: 6 },
  { number: 103, capacity: 8 },
  { number: 104, capacity: 10 },
  { number: 105, capacity: 12 },
];

const RoomsOverviewPage = () => {
  const [dateFrom, setDateFrom] = useState(() => new Date().toISOString().slice(0, 10));
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [reservations, setReservations] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const resObj = {};
      for (let room of ROOMS) {
        try {
          // Nur laden, wenn room und dateFrom gesetzt sind
          if (!room.number || !dateFrom) {
            resObj[room.number] = [];
            continue;
          }
          let allRes = [];
          let d = new Date(dateFrom);
          const to = new Date(dateTo);
          while (d <= to) {
            const dateStr = d.toISOString().slice(0, 10);
            const res = await api.get(`/reservations?room=${room.number}&date=${dateStr}`);
            allRes = allRes.concat(res.data.map(r => ({ ...r, date: dateStr })));
            d.setDate(d.getDate() + 1);
          }
          resObj[room.number] = allRes;
        } catch {
          resObj[room.number] = [];
        }
      }
      setReservations(resObj);
      setLoading(false);
    };
    if (dateFrom && dateTo) fetchReservations();
  }, [dateFrom, dateTo]);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Räume Übersicht</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            label="Von-Datum"
            type="date"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Bis-Datum"
            type="date"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      {ROOMS.map(room => {
        const resList = reservations[room.number] || [];
        const isAvailable = resList.length === 0;
        return (
          <Box
            key={room.number}
            sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2, cursor: "pointer", '&:hover': { background: '#f5f5f5' } }}
            onClick={() => navigate(`/reservation?room=${room.number}&date=${dateFrom}`)}
          >
            <Typography variant="h6">
              Zimmer {room.number} (max. {room.capacity} Personen)
              {isAvailable ? (
                <Chip label="Verfügbar" color="success" sx={{ ml: 2 }} />
              ) : (
                <Chip label="Belegt" color="error" sx={{ ml: 2 }} />
              )}
            </Typography>
            {isAvailable ? (
              <Typography variant="body2" color="text.secondary">Keine Buchungen im gewählten Zeitraum.</Typography>
            ) : (
              <List dense>
                {resList.map(r => (
                  <ListItem key={r.id + r.date}>
                    <ListItemText
                      primary={`Am ${r.date} von ${r.fromTime?.slice(0,5)} bis ${r.toTime?.slice(0,5)}`}
                      secondary={`Teilnehmer: ${r.participants}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        );
      })}
      {loading && <Typography>Lade Buchungen ...</Typography>}
    </Box>
  );
};

export default RoomsOverviewPage; 