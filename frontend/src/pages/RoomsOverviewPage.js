import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, TextField, List, ListItem, ListItemText, Chip, Grid, Button, Tabs, Tab, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

const RoomsOverviewPage = () => {
  const [dateFrom, setDateFrom] = useState(() => new Date().toISOString().slice(0, 10));
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [reservations, setReservations] = useState({});
  const [myReservations, setMyReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    const fetchMyReservations = async () => {
      if (user && user.email) {
        try {
          const response = await api.get(`/reservations/my-reservations?userEmail=${user.email}`);
          setMyReservations(response.data);
        } catch (error) {
          console.error("Fehler beim Laden der eigenen Reservierungen:", error);
          setMyReservations([]);
        }
      }
    };
    fetchMyReservations();
  }, [user]);

  const handleDeleteReservation = async (reservationId) => {
    console.log("User-Objekt beim Löschen:", user);
    if (!user || !user.email) {
      alert("Kein Benutzer eingeloggt oder E-Mail nicht verfügbar!");
      return;
    }
    if (window.confirm("Möchten Sie diese Reservierung wirklich löschen?")) {
      try {
        await api.delete(`/reservations/${reservationId}?userEmail=${encodeURIComponent(user.email)}`);
        // Aktualisiere die Liste der eigenen Reservierungen
        setMyReservations(prev => prev.filter(r => r.id !== reservationId));
        // Aktualisiere auch die Raumübersicht
        const updatedReservations = { ...reservations };
        Object.keys(updatedReservations).forEach(roomNumber => {
          updatedReservations[roomNumber] = updatedReservations[roomNumber].filter(r => r.id !== reservationId);
        });
        setReservations(updatedReservations);
        alert("Reservierung erfolgreich gelöscht!");
      } catch (error) {
        alert("Fehler beim Löschen der Reservierung: " + (error.response?.data?.error || error.message));
      }
    }
  };

  const formatDateRange = (dateFrom, dateTo) => {
    if (dateFrom === dateTo) {
      return new Date(dateFrom).toLocaleDateString('de-DE');
    }
    return `${new Date(dateFrom).toLocaleDateString('de-DE')} - ${new Date(dateTo).toLocaleDateString('de-DE')}`;
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Räume Übersicht</Typography>
      
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Alle Räume" />
        <Tab label="Meine Buchungen" />
      </Tabs>

      {activeTab === 0 && (
        <>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item>
              <TextField
                label="Von-Datum"
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item>
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
                sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
              >
                <Typography variant="h6">
                  Zimmer {room.number} (max. {room.capacity} Personen)
                  {isAvailable ? (
                    <Chip label="Verfügbar" color="success" sx={{ ml: 2 }} />
                  ) : (
                    <Chip label="Belegt" color="error" sx={{ ml: 2 }} />
                  )}
                </Typography>
                {/* Debug-Ausgabe: API-Response als JSON anzeigen */}
                <pre style={{ background: '#f5f5f5', fontSize: 12, padding: 8, borderRadius: 4, marginBottom: 8 }}>
                  {JSON.stringify(resList, null, 2)}
                </pre>
                {isAvailable ? (
                  <Typography variant="body2" color="text.secondary">
                    Keine Buchungen im gewählten Zeitraum.
                  </Typography>
                ) : (
                  <List dense>
                    {resList.map(r => (
                      <ListItem
                        key={r.id}
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                      >
                        <Box>
                          <Typography variant="body2">
                            {r.dateFrom} {r.fromTime?.slice(0,5)} - {r.toTime?.slice(0,5)}
                          </Typography>
                          <Typography variant="body2">
                            Teilnehmer: {r.participants}
                          </Typography>
                          {r.remark && (
                            <Typography variant="body2" color="text.secondary">
                              Bemerkung: {r.remark}
                            </Typography>
                          )}
                        </Box>
                        {((r.user && r.user.id === user.id) || r.user_id === user.id) && (
                          <Box>
                            <IconButton
                              color="primary"
                              title="Buchung bearbeiten"
                              aria-label="Buchung bearbeiten"
                              onClick={() => navigate(`/edit-reservation/${r.id}`)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              title="Buchung löschen"
                              aria-label="Buchung löschen"
                              onClick={() => handleDeleteReservation(r.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            );
          })}
        </>
      )}

      {activeTab === 1 && (
        <Box>
          {!user ? (
            <Typography color="text.secondary">Bitte loggen Sie sich ein, um Ihre Buchungen zu sehen.</Typography>
          ) : myReservations.length === 0 ? (
            <Typography color="text.secondary">Sie haben noch keine Buchungen.</Typography>
          ) : (
            <List>
              {myReservations.map(reservation => (
                <ListItem
                  key={reservation.id}
                  sx={{ 
                    border: "1px solid #ccc", 
                    borderRadius: 2, 
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">
                      Zimmer {reservation.room}
                    </Typography>
                    <Typography variant="body2">
                      Datum: {formatDateRange(reservation.dateFrom, reservation.dateTo)}
                    </Typography>
                    <Typography variant="body2">
                      Zeit: {reservation.fromTime?.slice(0,5)} - {reservation.toTime?.slice(0,5)}
                    </Typography>
                    <Typography variant="body2">
                      Teilnehmer: {reservation.participants}
                    </Typography>
                    {reservation.remark && (
                      <Typography variant="body2" color="text.secondary">
                        Bemerkung: {reservation.remark}
                      </Typography>
                    )}
                  </Box>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReservation(reservation.id);
                    }}
                    title="Reservierung löschen"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}

      {loading && <Typography>Lade Buchungen ...</Typography>}
    </Box>
  );
};

export default RoomsOverviewPage; 