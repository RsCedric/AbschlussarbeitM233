import React, { useContext } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Willkommen{user ? `, ${user.username}` : "!"}
      </Typography>
      <Button variant="contained" onClick={() => navigate("/reservation")}>Reservation erstellen</Button>
    </Box>
  );
};

export default HomePage; 