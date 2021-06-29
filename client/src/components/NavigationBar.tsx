import React, { ReactElement } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavigationBar = (): ReactElement => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">Observatory</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-content" />
      <Navbar.Collapse id="navbar-content">
        <Nav className="mr-auto">
          <LinkContainer exact to="/">
            <Nav.Link>Overview</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/model">
            <Nav.Link>Model</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/predictions">
            <Nav.Link>Predictions</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavigationBar;
