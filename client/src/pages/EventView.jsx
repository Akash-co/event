import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createBookingAPI, getEventByIdAPI } from '../services/allApi';
import SERVER_BASE_URL from '../services/serverUrl'; 

const EventView = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const result = await getEventByIdAPI(id);
        if (result.status === 200) {
          console.log("Event Details:", result.data);  
          setEventDetails(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchEventDetails();
  }, [id]);


  const handleAddToBooking = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
      alert("Please login to add booking");
      navigate('/login');
      return;
    }
    const userId = user._id;  
    console.log(userId);
    console.log(eventDetails?._id);  
  
    if (eventDetails) {
      const bookingDetails = {
        userId,
        eventId: eventDetails._id,
        eventName: eventDetails.eventName,
        eventImage: eventDetails.eventImage,
        status: eventDetails.status,
        description: eventDetails.description,
        date: eventDetails.date,
        price: eventDetails.price,
        location: eventDetails.location,
      };
  
      try {
         const existingBookingResponse = await createBookingAPI({ userId, eventId: eventDetails._id });

        if (existingBookingResponse.status === 200 && existingBookingResponse.data.length > 0) {
          const isEventAlreadyBooked = existingBookingResponse.data.some(
            (booking) => booking.eventId === eventDetails._id
          );
  
          if (isEventAlreadyBooked) {
            alert("You have already booked this event.");
            return;
          }
        }
  
         const result = await createBookingAPI(bookingDetails);
        if (result.status === 200) {
          alert("Booking added successfully");
          console.log("Booking Response:", result.data);
          navigate('/bookings'); 
        } else {
          alert("Sorry .Ticket Sold Out !!");
        }
      } catch (err) {
        alert("Failed to add booking");
        console.error(err);
      }
    }
  };
  


if (!eventDetails) {
  return <div>Loading...</div>;
}

  // Check if seatsAvailable property exists
  const seatsAvailableMessage = eventDetails.seatsAvailable !== undefined
  ? (eventDetails.seatsAvailable <= 5
      ? `Hurry! Only ${eventDetails.seatsAvailable} seats left.`
      : `${eventDetails.seatsAvailable} seats available`)
  : "Seats information not available";

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px', position: 'relative', overflow: 'hidden' }} className="container mt-5">
        <h1 style={{
          fontFamily: '"Hubot Sans", serif',
          fontWeight: '500',
          fontSize: '3.5rem',
          opacity: 0.9,
          marginBottom: '10px',
        }} className='fw-bolder'>E<span className='text-primary'>vents</span></h1>    
        <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
          <img   src={`${SERVER_BASE_URL}/uploads/${eventDetails?.eventImage}`} alt="Event" style={{ width: '100%', height: '600px' }} className='img-fluid' />
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#fff' }}>
            <h3 style={{
              fontFamily: '"Hubot Sans", serif',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '5px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }} className='fw-bolder'>{eventDetails?.eventName}</h3>
            <p style={{
              fontFamily: '"Hubot Sans", serif',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '5px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }} className='fw-bolder'>{eventDetails?.category}</p>
          </div>
          <div className='shadow' style={{ position: 'absolute', bottom: '20px', right: '20px', color: '#fff', textAlign: 'right', maxWidth: '40%', padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '8px' }}>
          
          </div>
        </div>
      </div>
      <div className="container mt-5">
      <h2
        style={{
          fontFamily: '"Hubot Sans", serif',
          fontWeight: '500',
          fontSize: '2.5rem',
          opacity: 0.9,
          marginBottom: '30px',
          textAlign: 'center',
          color: '#333',
        }}
        className="fw-bolder mb-5"
      >
        <span className="text-primary fw-bolder">Event</span> Details
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
        }}
      >
        <div
          className="event-detail-card shadow-lg"
          style={{
            padding: '30px',
            borderRadius: '20px',
            backgroundColor: '#f0f4f8',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Hover Effect: Gradient Background and Shadow on Hover */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top left, rgba(0, 123, 255, 0.2), rgba(0, 0, 0, 0.2))',
              opacity: 0,
              transition: 'opacity 0.4s ease',
            }}
            className="event-detail-hover"
          ></div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Event Name & Category */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Hubot Sans", serif',
                  fontWeight: '700',
                  fontSize: '2.2rem',
                  color: '#333',
                }}
              >
                {eventDetails.eventName}
              </h3>
              <p
                style={{
                  fontFamily: '"Hubot Sans", serif',
                  fontWeight: '500',
                  fontSize: '1.2rem',
                  color: '#007bff',
                  textTransform: 'uppercase',
                }}
              >
                {eventDetails.category}
              </p>
            </div>

            {/* Event Information */}
            <div className="row">
              <div className="col-md-6">
                <p><strong>Location:</strong> {eventDetails.location}</p>
                <p><strong>Date:</strong> {eventDetails.date}</p>
                <p><strong>Event Type:</strong> {eventDetails.eventType}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Status:</strong> {eventDetails.status}</p>
                <p><strong>Price:</strong> ${eventDetails.price}</p>
                <p><strong>Seats Available:</strong> {seatsAvailableMessage}</p>
              </div>
            </div>

            {/* Description */}
            <div
              className="description"
              style={{
                padding: '20px',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                marginTop: '20px',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: '#333',
              }}
            >
              <p>{eventDetails.description}</p>
            </div>

            {/* Add to Booking Button */}
          
          </div>
        </div>
      </div>
      <div className="text-center" style={{ marginTop: '30px' }}>
    <button
      onClick={handleAddToBooking}
      className="btn btn-primary"
      style={{
        fontSize: '1.1rem',
        padding: '12px 30px',
        borderRadius: '30px',
        border: 'none',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
      }}
    >
      Add to Booking
    </button>
  </div>
    </div>
    </>
  );
};

export default EventView;
