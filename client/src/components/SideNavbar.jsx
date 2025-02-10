import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <>
      {/* Top Navbar */}
    
      {/* Sidebar */}
      <div className="d-flex bg-body-tertiary shadow border">
        <div
          style={{
            width: '260px',
            height: '100vh',
          }}
          className="shadow-sm d-flex flex-column align-items-start p-3"
        >
          {/* Sidebar Links */}
          <Nav className="flex-column">
            <NavLink
              to="/booking-list"
              className={({ isActive }) =>
                `py-3 px-3 fw-semibold d-flex align-items-center rounded text-decoration-none ${
                  isActive ? 'bg-primary text-white' : 'text-dark'
                }`
              }
              style={{ fontSize: '18px' }}
            >
              <i className="fa-solid fa-people-group me-2"></i>
              Bookings
            </NavLink>

            <NavLink
              to="/add-event"
              className={({ isActive }) =>
                `py-3 px-3 fw-semibold d-flex align-items-center rounded text-decoration-none ${
                  isActive ? 'bg-primary text-white' : 'text-dark'
                }`
              }
              style={{ fontSize: '18px' }}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Add Events
            </NavLink>

            <NavLink
              to="/events-list"
              className={({ isActive }) =>
                `py-3 px-3 fw-semibold d-flex align-items-center rounded text-decoration-none ${
                  isActive ? 'bg-primary text-white' : 'text-dark'
                }`
              }
              style={{ fontSize: '18px' }}
            >
              <i className="fa-solid fa-calendar-check me-2"></i>
              Event Lists
            </NavLink>
          </Nav>
        </div>

     
      </div>
    </>
  );
};

export default SideNavbar;
