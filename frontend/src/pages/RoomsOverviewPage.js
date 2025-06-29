import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, MenuItem, List, ListItem, ListItemText, Chip } from "@mui/material";
import api from "../api/axios";

const ROOMS = [
  { number: 101, capacity: 4 },
  { number: 102, capacity: 6 },
  { number: 103, capacity: 8 },
  { number: 104, capacity: 10 },
  { number: 105, capacity: 12 },
];

const RoomsOverviewPage = () => {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [reservations, setReservations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      const resObj = {};
      for (let room of ROOMS) {
        try {
          const res = await api.get(`/reservations?room=${room.number}&date=${date}`);
          resObj[room.number] = res.data;
        } catch {
          resObj[room.number] = [];
        }
      }
      setReservations(resObj);
      setLoading(false);
    };
    fetchReservations();
  }, [date]);

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Räume Übersicht</Typography>
      <TextField
        label="Datum"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        sx={{ mb: 3 }}
        InputLabelProps={{ shrink: true }}
      />
      {ROOMS.map(room => {
        const resList = reservations[room.number] || [];
        const isAvailable = resList.length === 0;
        return (
          <Box key={room.number} sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h6">
              Zimmer {room.number} (max. {room.capacity} Personen)
              {isAvailable ? (
                <Chip label="Verfügbar" color="success" sx={{ ml: 2 }} />
              ) : (
                <Chip label="Belegt" color="error" sx={{ ml: 2 }} />
              )}
            </Typography>
            {isAvailable ? (
              <Typography variant="body2" color="text.secondary">Keine Buchungen für dieses Datum.</Typography>
            ) : (
              <List dense>
                {resList.map(r => (
                  <ListItem key={r.id}>
                    <ListItemText
                      primary={`Von ${r.fromTime?.slice(0,5)} bis ${r.toTime?.slice(0,5)}`}
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