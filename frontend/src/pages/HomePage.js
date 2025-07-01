import React, { useContext } from "react";
import { Button, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
      <Box sx={{
        p: 4,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        minWidth: 370,
        textAlign: 'center',
        border: '1.5px solid',
        borderColor: 'primary.main',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Typography
          variant="h2"
          gutterBottom
          fontWeight={700}
          sx={{
            color: 'primary.main',
            letterSpacing: 1.2,
            mb: 2,
          }}
        >
          Willkommen{user ? `, ${user.username}` : "!"}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ mb: 4, color: 'secondary.main', fontWeight: 400 }}>
          Schön, dass Sie da sind. Was möchten Sie tun?
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="contained"
            size="large"
            sx={{
              fontWeight: 700,
              fontSize: 20,
              borderRadius: 2,
            }}
            onClick={() => navigate("/reservation")}
          >
            Reservation erstellen
          </Button>
          {user && (
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                fontWeight: 600,
                fontSize: 18,
              }}
              onClick={() => navigate("/meinebuchungen")}
            >
              Meine Buchungen
            </Button>
          )}
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: 18,
            }}
            onClick={() => navigate("/rooms")}
          >
            Räume Übersicht
          </Button>
          {!user && (
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                fontWeight: 600,
                fontSize: 18,
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
          {!user && (
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: 18,
              }}
              onClick={() => navigate("/register")}
            >
              Registrieren
            </Button>
          )}
          <Button
            variant="text"
            size="small"
            sx={{
              color: 'secondary.main',
              fontWeight: 600,
              mt: 2,
              textDecoration: 'underline',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            onClick={() => navigate("/admin")}
          >
            Admin Login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage; 