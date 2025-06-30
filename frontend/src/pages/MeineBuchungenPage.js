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
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Meine Buchungen</Typography>
      {reservations.length === 0 ? (
        <Typography>Keine Buchungen vorhanden.</Typography>
      ) : (
        <List>
          {reservations.map(res => (
            <ListItem key={res.id} sx={{ border: "1px solid #ccc", borderRadius: 2, mb: 2 }}
              secondaryAction={
                <>
                  <IconButton color="primary" onClick={() => navigate(`/edit-reservation/${res.id}`, { state: { reservation: res } })}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(res.id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemText
                primary={`Zimmer ${res.room} | ${res.dateFrom} ${res.fromTime?.slice(0,5)} - ${res.toTime?.slice(0,5)}`}
                secondary={<>
                  Teilnehmer: {res.participants}<br/>
                  Bemerkung: {res.remark || "-"}
                </>}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default MeineBuchungenPage; 