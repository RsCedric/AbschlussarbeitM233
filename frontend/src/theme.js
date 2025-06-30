import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff00cc', // Neon Pink
      light: '#ff66e7',
      dark: '#b2008f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#00fff7', // Türkis
      light: '#5efffb',
      dark: '#00b2a9',
      contrastText: '#121212',
    },
    error: {
      main: '#ff1744',
    },
    background: {
      default: '#121212', // fast schwarz
      paper: '#1e1e1e',
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: 1,
        },
      },
    },
  },
});
export default theme; 