import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../images/combi.webp';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="me-auto" href="#home"><img src={logo} alt="logo" className="logo-img"/>VIBRA RETRO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Iniciar sesión</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Estadísticas</Nav.Link>
            <Nav.Link as={Link} to="/users">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/administrators">Administradores</Nav.Link>
            <Nav.Link as={Link} to="/">Salir</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
