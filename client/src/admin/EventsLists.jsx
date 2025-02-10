import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import SideNavbar from '../components/SideNavbar';
import { Container, Navbar, Row, Col } from 'react-bootstrap';
import EventCard from '../components/EventCard';
import { allEventAPI, deleteEventAPI } from '../services/allApi'; // Import deleteEventAPI

const EventsLists = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const result = await allEventAPI();
      if (result.status === 200) {
        setAllEvents(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const result = await deleteEventAPI(eventId);  
      if (result.status === 200) {
        setAllEvents(allEvents.filter(event => event._id !== eventId));  
        console.log('Event deleted successfully');
        alert("Event Deleted !!")
      }
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary shadow">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} alt="Logo" style={{ height: '50px' }} />
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Content Section */}
      <div className="d-flex">
        {/* Sidebar */}
        <SideNavbar />

        <div className="p-5 container">
          <h1
            style={{
              fontFamily: '"Hubot Sans", serif',
              fontSize: '2rem',
              opacity: 0.9,
              marginBottom: '20px',
            }}
            className="fw-bolder"
          >
            <span className="text-primary fw-bolder">Events</span> Lists
          </h1>
          <Row xs={1} sm={1} md={3} lg={3} className="g-4">
            {allEvents.map((event) => (
              <Col key={event._id} className="d-flex">
                <EventCard displayData={event} isAdmin={true} onDelete={handleDelete} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
};

export default EventsLists;
