import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Extend the default theme types
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
      success: string;
    };
  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
      success?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#335CFF', // Royal Blue
      light: '#5C7BFF',
      dark: '#0041CB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00A8A8', // Teal
      light: '#4FD8D8',
      dark: '#007A7A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F6F8', // Soft Grey
      paper: '#FFFFFF',
    },
    error: {
      main: '#FF4444', // Danger
    },
    success: {
      main: '#19C37D', // Success
    },
    text: {
      primary: '#2D3748',
      secondary: '#718096',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.35,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          padding: '2rem',
        },
      },
    },
  },
  spacing: (factor: number) => `${0.5 * factor}rem`, // 1 = 0.5rem = 8px
});

// Add custom properties to the theme
theme.status = {
  danger: theme.palette.error.main,
  success: theme.palette.success.main,
};

export default theme;
