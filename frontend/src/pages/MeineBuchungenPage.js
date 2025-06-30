import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography, Button, CircularProgress, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const MeineBuchungenPage = () => {
  const { user } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError("");
    console.log("Lade Buchungen für User-ID:", user.id);
    axios.get(`/reservations/user/${user.id}`)
      .then(res => {
        console.log("API Response:", res.data);
        setReservations(res.data);
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Buchungen:", err);
        setError("Fehler beim Laden der Buchungen.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Buchung wirklich löschen?")) return;
    try {
      console.log("Sende DELETE für Buchung:", id);
      await axios.delete(`/reservations/${id}`);
      setReservations(reservations.filter(r => r.id !== id));
      console.log("Buchung gelöscht:", id);
    } catch (err) {
      console.error("Fehler beim Löschen der Buchung:", err);
      setError("Fehler beim Löschen der Buchung.");
    }
  };

  if (!user) return <Typography>Bitte einloggen.</Typography>;
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom sx={{ color: 'primary.main', textShadow: 'none' }}>
        Meine Buchungen
      </Typography>
      {reservations.length === 0 ? (
        <Typography color="text.secondary">Keine Buchungen vorhanden.</Typography>
      ) : (
        <List>
          {reservations.map(res => (
            <ListItem
              key={res.id}
              sx={{
                mb: 3,
                p: 3,
                borderRadius: 4,
                boxShadow: '0 2px 12px 0 #00000033',
                background: 'linear-gradient(90deg, #232323 60%, #181818 100%)',
                border: '1.5px solid',
                borderColor: 'primary.main',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'box-shadow 0.3s',
              }}
              secondaryAction={
                <Box>
                  <IconButton color="primary" title="Buchung bearbeiten" onClick={() => navigate(`/edit-reservation/${res.id}`, { state: { reservation: res } })}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" title="Buchung löschen" onClick={() => handleDelete(res.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <Box>
                <Typography variant="h6" fontWeight={600} color="primary.main" sx={{ textShadow: 'none' }}>
                  Zimmer {res.room}
                </Typography>
                <Typography variant="body1" color="#fff" fontWeight={500}>
                  {res.dateFrom} {res.fromTime?.slice(0,5)} - {res.toTime?.slice(0,5)}
                </Typography>
                <Typography variant="body2" color="secondary.main">
                  Teilnehmer: {res.participants}
                </Typography>
                {res.remark && (
                  <Typography variant="body2" color="text.secondary">
                    Bemerkung: {res.remark}
                  </Typography>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MeineBuchungenPage; 