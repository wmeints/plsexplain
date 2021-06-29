import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { history } from '../redux/store';
import OverviewPage from '../pages/OverviewPage';
import ModelDashboardPage from '../pages/ModelDashboardPage';
import PredictionDashboardPage from '../pages/PredictionDashboardPage';

const App = (): React.ReactElement => (
  <Router history={history}>
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
    <Switch>
      <Route exact path="/">
        <OverviewPage />
      </Route>
      <Route path="/model">
        <ModelDashboardPage />
      </Route>
      <Route path="/predictions">
        <PredictionDashboardPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
