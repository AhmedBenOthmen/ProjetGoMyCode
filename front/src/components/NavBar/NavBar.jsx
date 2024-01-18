import React from 'react';
import { Container, Form, Button, Navbar, Nav } from 'react-bootstrap';
import NavBarLogo from '../../assets/images/jobhub-high-resolution-logo-transparent.png';
import { useNavBar } from './useNavBar';
import './NavBar.css'

function NavBar({handleRefresh}) {
  const { searchQuery, handleSearch, onLogout } = useNavBar(handleRefresh);

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#424040' }}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={NavBarLogo} alt="JobHub LOGO" width="50" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" style={{ color: '#e65728' }}>Home</Nav.Link>
            <Nav.Link href="/profile" style={{ color: '#e65728' }}>Profile</Nav.Link>
            <Nav.Link href="/myjobs" style={{ color: '#e65728' }}>Post A Job</Nav.Link>
            <Nav.Link href="/admin" style={{ color: '#e65728' }}>Admin Tab</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex" >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {/* <Button onClick={handleSearch} variant="outline-success">
            Search
          </Button> */}
          <Button onClick={onLogout} variant="outline-danger">logout</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;
