import React, { useEffect, useState } from 'react';
import logo from '../assets/Logo.png';
import SideNavbar from '../components/SideNavbar';
import { Container, Navbar, Table } from 'react-bootstrap';
import { getAdminBookingListAPI } from '../services/allApi';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const result = await getAdminBookingListAPI();
      if (result.status === 200) {
        setBookings(result.data);
      } else {
        setError('Failed to fetch bookings.');
      }
    } catch (err) {
      setError('Error fetching bookings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
console.log(bookings);

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

        {/* Main Content */}
        <div className="container p-5">
          <h1
            style={{
              fontFamily: '"Hubot Sans", serif',
              fontSize: '2rem',
              opacity: 0.9,
              marginBottom: '20px',
            }}
            className="fw-bolder"
          >
            Bookings
          </h1>

          {/* Error message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Loading spinner */}
          {isLoading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          )}

          {/* Bookings Table */}
          {!isLoading && !error && bookings.length > 0 && (
            <Table striped bordered hover responsive="md" className="text-center">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>UserName</th>
                  <th>Date</th>
                  <th>Event Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{booking.userName}</td>
                    <td>{booking.date}</td>
                    <td>{booking.eventName}</td>
                    <td>${booking.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* No bookings message */}
          {!isLoading && !error && bookings.length === 0 && (
            <div className="alert alert-info">No bookings available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingsList;
