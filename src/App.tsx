import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import ApplicationRoutes from './config/ApplicationRoutes';

function App() {
  return (
    <Container fluid>
      <ApplicationRoutes />
    </Container>
  );
}

export default App;
