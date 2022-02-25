import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import ApplicationRoutes from './config/ApplicationRoutes';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
      primary: {
          main: "#FF9A9A"
      },

  },
  typography: {
      fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
      ].join(','),
      subtitle1: {
          color: "#888",
          fontSize: "1.15em"
      },
  },
  overrides: {
      MuiTooltip: {
          tooltip: {
              fontSize: "0.8em"
          }
      }
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container fluid>
        <ApplicationRoutes />
      </Container>
    </ThemeProvider>
  );
}

export default App;
