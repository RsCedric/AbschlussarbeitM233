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
        borderRadius: 4,
        boxShadow: '0 0 32px 4px #ff00cc55',
        minWidth: 370,
        textAlign: 'center',
        border: '2px solid',
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
            textShadow: '0 0 16px #ff00cc, 0 0 32px #ff00cc',
            letterSpacing: 2,
            mb: 2,
            animation: 'glow 2s infinite alternate',
            '@keyframes glow': {
              from: { textShadow: '0 0 16px #ff00cc, 0 0 32px #ff00cc' },
              to: { textShadow: '0 0 32px #00fff7, 0 0 64px #00fff7' },
            },
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
              background: 'linear-gradient(90deg, #ff00cc 0%, #00fff7 100%)',
              color: '#121212',
              fontWeight: 700,
              fontSize: 20,
              boxShadow: '0 0 16px #00fff7',
              borderRadius: 3,
              transition: 'transform 0.2s',
              '&:hover': {
                background: 'linear-gradient(90deg, #00fff7 0%, #ff00cc 100%)',
                transform: 'scale(1.05)',
                boxShadow: '0 0 32px #ff00cc',
              },
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
                boxShadow: '0 0 8px #00fff7',
                '&:hover': {
                  background: 'rgba(0,255,247,0.1)',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  boxShadow: '0 0 16px #ff00cc',
                },
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
              boxShadow: '0 0 8px #ff00cc',
              '&:hover': {
                background: 'rgba(255,0,204,0.08)',
                borderColor: 'secondary.main',
                color: 'secondary.main',
                boxShadow: '0 0 16px #00fff7',
              },
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
                '&:hover': {
                  background: 'rgba(0,255,247,0.1)',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                },
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
                '&:hover': {
                  background: 'rgba(255,0,204,0.08)',
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                },
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
                textShadow: '0 0 8px #ff00cc',
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