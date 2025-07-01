import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff00cc', // Pink
      contrastText: '#fff',
    },
    secondary: {
      main: '#f5f5f5', // Hellgrau für Akzente
      contrastText: '#18181b',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#18181b',
      paper: '#23232a',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
    h2: {
      fontWeight: 700,
      letterSpacing: 1.2,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: 1,
          boxShadow: 'none',
          transition: 'background 0.2s, color 0.2s',
        },
        containedPrimary: {
          background: '#ff00cc',
          color: '#fff',
          '&:hover': {
            background: '#b2008f',
            color: '#fff',
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: '#ff00cc',
          color: '#ff00cc',
          '&:hover': {
            background: '#18181b',
            borderColor: '#b2008f',
            color: '#b2008f',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});
export default theme; 