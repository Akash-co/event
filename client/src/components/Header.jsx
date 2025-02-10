import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import logo from '../assets/Logo.png';
import drop from '../assets/drop.png';
import Dropdown from 'react-bootstrap/Dropdown';

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();  
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");  
  };

  return (
    <Navbar expand="lg" style={{ zIndex: 1000, position: 'fixed', top: "0px", width: '100%', backgroundColor: '#f8f9fa', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #ddd', }}>
      <Container>
        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          <Link to="/" style={{
            textDecoration: 'none', color: '#007bff',
            display: 'flex',
            alignItems: 'center',
          }}>
            <img src={logo} alt="Logo" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center" style={{ alignItems: 'center' }}>
            <Nav.Link as={Link} to="/" style={{ color: '#343a40', fontWeight: '500', margin: '0 10px' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/services" style={{ color: '#343a40', fontWeight: '500', margin: '0 10px' }}>Services</Nav.Link>
            <Nav.Link as={Link} to="/all-events" style={{ color: '#343a40', fontWeight: '500', margin: '0 10px' }}>All Events</Nav.Link>
            <Nav.Link as={Link} to="/contact-us" style={{ color: '#343a40', fontWeight: '500', margin: '0 10px' }}>Contact Us</Nav.Link>
          </Nav>

          {isLogin ? (
            <Dropdown className=''>
              <Dropdown.Toggle className='p-1' id="dropdown-basic">
                <img width={'50px'} src={drop} alt="Dropdown" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Link to={'/my-profile'}>
                  <Dropdown.Item as="span">My Profile</Dropdown.Item>
                </Link>
                <Link to={'/bookings'}>
                  <Dropdown.Item as="span">Bookings</Dropdown.Item>
                </Link>
                <Dropdown.Item as="span" onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to={'/register'}>
              <button style={{ border: '1px solid #007bff', backgroundColor: '#007bff', color: '#fff', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 12px', borderRadius: '5px', fontSize: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }} className="btn">
                Create Account
              </button>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
