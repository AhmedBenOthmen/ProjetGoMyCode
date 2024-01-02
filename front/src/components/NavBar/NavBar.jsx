import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavBarLogo from '../../assets/images/jobhub-high-resolution-logo-transparent.png'
import { useSelector, useDispatch } from "react-redux";
import { logout,reset } from "../../Redux/auth/authSlice.js";
import { useNavigate } from "react-router-dom";


function NavBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)

  const onLogout = ()=>{
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
        <img src={NavBarLogo} alt="JobHub LOGO" width="50" height="50"></img>
            
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/myjobs">My Jobs</Nav.Link>
            <Nav.Link href="/admin">Admin Tab</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            
            <Button onClick={() => onLogout()} variant="outline-success">Search</Button>
            <button onClick={onLogout}>logout</button>
           
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
