import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import Header from '../components/Header';
import { deleteBookingAPI, getBookingsAPI, sendBookingDetailsAPI } from '../services/allApi';   
import taylor from '../assets/taylor.png';
import SERVER_BASE_URL from '../services/serverUrl';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  console.log(bookings);
  
  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Get the logged-in user from session storage
    if (!user) {
      setError("Please log in to view your bookings.");
      return;
    }

    const userId = user._id;

    setIsLoading(true);
    try {
      const result = await getBookingsAPI(userId); // Call API to get bookings by user ID
      if (result.status === 200) {
        setBookings(result.data);
      } else {
        setError("Failed to fetch bookings.");
      }
    } catch (err) {
      setError("Error fetching bookings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

    // Function to delete a booking
    const handleDeleteBooking = async (bookingId) => {
      try {
        const result = await deleteBookingAPI(bookingId);  
        if (result.status === 200) {
          alert("Booking cancelled!!!");
          fetchBookings();   
        } else {
          alert("Failed to delete booking");
        }
      } catch (err) {
        console.error(err);
      }
    };

    const handleAddPay = async (booking) => {
      console.log("handleAddPay");
    
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (!user) {
        alert("Please log in to proceed.");
        return;
      }
    
      const eventId = booking.eventId;  
      console.log("Event ID:", eventId);
    
      if (!eventId) {
        alert("Event ID is missing.");
        return;
      }
    
      const reqBody = {
        userId: user._id,
        eventId: eventId,
      };
    console.log(reqBody);
    
      try {
        const result = await sendBookingDetailsAPI(reqBody);
        if (result.status === 200) {
          alert("Event Booked Successfully");
          console.log("Booking Response:", result.data);
        } else {
          alert("Failed to add booking");
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred. Please try again.");
      }
    };
    

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className="container mt-5">
        <h1
          style={{
            fontFamily: '"Hubot Sans", serif',
            fontWeight: '500',
            fontSize: '3.5rem',
            opacity: 0.9,
            marginBottom: '10px',
          }}
          className="fw-bolder"
        >
          <span style={{ fontSize: '70px' }} className="fw-bolder text-primary">
            My
          </span>{' '}
          Bookings
        </h1>

         {isLoading && (
          <div className="d-flex justify-content-center">
            <CircularProgress color="primary" />
          </div>
        )}

         {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

         {!isLoading && !error && bookings.length > 0 && bookings.map((booking) => (
          <div key={booking._id} className="d-flex justify-content-start container align-items-center mt-3">
            <img
              src={`${SERVER_BASE_URL}/uploads/${booking?.eventImage}`}
              style={{
                width: '200px',
                objectFit: 'cover',
                marginRight: '15px',
              }}
              className="rounded shadow"
              alt={booking.eventName} 
            />
            <div
              style={{
                flex: '1',
                minWidth: '600px',
                maxWidth: '100%',
                backgroundColor: 'rgba(150, 184, 250, 1)',
                height: '150px',
                padding: '15px',
                boxSizing: 'border-box',
              }}
              className="text-light text-shadow fw-bold rounded shadow-sm d-flex flex-column justify-content-between"
            >
              <h5
                className="fw-bold text-light"
                style={{
                  fontSize: '1rem',
                  marginBottom: '8px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {booking.eventName}
              </h5>

              <div className="d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                <div>
                  <p className="mb-1">
                    <i className="fa-solid fa-ticket me-2"></i>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <p className="mb-1">
                    <i className="fa-solid fa-sack-dollar me-2"></i>
                    <strong>Price:</strong> ${booking.price}
                  </p>
                  <p className="mb-1">
                    <i className="fa-solid fa-calendar-days me-2"></i>
                    <strong>Date & Time:</strong> {booking.date}
                  </p>
                  <p className="mb-0">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    <strong>Location:</strong> {booking.location}
                  </p>
                </div>

                <div className="d-flex gap-2">
                  <button   onClick={() => handleDeleteBooking(booking._id)}  className="btn btn-danger btn-sm" style={{ fontSize: '0.85rem', padding: '5px 10px' }}>
                    Cancel Booking
                  </button>
                  <button onClick={() => handleAddPay(booking)} className="btn btn-success btn-sm" style={{ fontSize: '0.85rem', padding: '5px 10px' }}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

         {!isLoading && !error && bookings.length === 0 && (
          <div className="alert alert-info" role="alert">
            You have no bookings yet.
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
