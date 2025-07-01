import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Navbar = () => {
  const { user, admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', boxShadow: '0 2px 12px 0 #00000033', borderRadius: 0, mb: 3 }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
            color: 'primary.main',
            letterSpacing: 2,
            userSelect: 'none',
          }}
        >
          <CalendarMonthIcon sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
          Roomify
        </Typography>
        {admin ? (
          <>
            <Button sx={navBtnStyle} component={Link} to="/admin/dashboard">Dashboard</Button>
            <Button sx={navBtnStyle} component={Link} to="/rooms">Räume Übersicht</Button>
            <Button sx={navBtnStyle} onClick={handleLogout}>Logout</Button>
          </>
        ) : user ? (
          <>
            <Button sx={navBtnStyle} component={Link} to="/">Home</Button>
            <Button sx={navBtnStyle} component={Link} to="/reservation">Reservation</Button>
            <Button sx={navBtnStyle} component={Link} to="/rooms">Räume Übersicht</Button>
            <Button sx={navBtnStyle} onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button sx={navBtnStyle} component={Link} to="/login">Login</Button>
            <Button sx={navBtnStyle} component={Link} to="/register">Registrieren</Button>
            <Button sx={navBtnStyle} component={Link} to="/admin">Admin</Button>
            <Button sx={navBtnStyle} component={Link} to="/rooms">Räume Übersicht</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

// Style für die Navbar-Buttons
const navBtnStyle = {
  color: 'primary.main',
  fontWeight: 500,
  fontSize: 17,
  borderRadius: 2,
  mx: 1,
  px: 2.5,
  py: 1,
  background: 'none',
  border: '2px solid #1976d2',
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    background: '#1976d2',
    color: '#fff',
    borderColor: '#115293',
  },
};

export default Navbar; 