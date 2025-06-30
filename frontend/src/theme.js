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
    background: {
      default: '#121212', // fast schwarz
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: '#b0b0b0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});
export default theme; 