import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.125rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    padding: '6px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                },
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                padding: '6px 16px',
                borderRadius: '4px',
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
                },
            },
        },
    },
});
export default theme;S