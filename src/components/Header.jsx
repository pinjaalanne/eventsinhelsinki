import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const [user, error] = useAuthState(auth);

  if (!user) {
    return (
      < Container fluid >
        <Row>
          <Navbar style={{ height: '60px', backgroundColor: "#dacfe3", padding: 2, borderBottom: "0.5px black solid" }} fixed="top">
            <Container className="justify-content-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/">
                    <Button style={{ fontSize: "1.3rem", marginRight: "3rem", fontWeight: "700", textTransform: "uppercase" }} variant="contained">EVENTS IN HELSINKI</Button>
                  </Link>
                  <Link to="/register">
                    <Button style={{ fontSize: "1.2rem", fontWeight: "500" }} variant="contained">Register</Button>
                  </Link>
                  <Link style={{ fontSize: "1.2rem", fontWeight: "500" }} to="/login">
                    <Button style={{ fontSize: "1.1rem", fontWeight: "500" }} variant="dark">Login</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container >
    )
  } else {
    return (
      <Container fluid>
        <Row>
          <Navbar style={{ height: '60px', backgroundColor: "#dacfe3", padding: 2, borderBottom: "0.5px black solid" }} fixed="top">
            <Container className="justify-content-end">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/">
                    <Button style={{ fontSize: "1.3rem", marginRight: "3rem", fontWeight: "700", textTransform: "uppercase" }} variant="contained">EVENTS IN HELSINKI</Button>
                  </Link>
                  <Link to="/events">
                    <Button style={{ fontSize: "1.2rem", fontWeight: "500" }} variant="contained">Events</Button>
                  </Link>
                  <Link to="/favorites">
                    <Button style={{ fontSize: "1.2rem", fontWeight: "500" }} variant="contained">Favorites</Button>
                  </Link>
                  <Button style={{ fontSize: "1.1rem", fontWeight: "500" }} onClick={logout} variant="dark">Logout</Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Row>
      </Container >
    )
  }
};

export default Header;