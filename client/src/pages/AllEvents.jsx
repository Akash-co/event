import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';
import { allEventAPI } from '../services/allApi';

const AllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const result = await allEventAPI();
      console.log(result);
      if (result.status === 200) {
        setAllEvents(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="text-center fw-bolder mt-5">
        <h1 style={{
          fontFamily: '"Hubot Sans", serif',
          fontWeight: '500',
          fontSize: '3.5rem',
          opacity: 0.9,
          marginBottom: '10px',
        }} className='fw-bolder pt-5'><span className='text-primary fw-bolder'>All</span> Events</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap" style={{ paddingTop: '70px' }}>
        {
          allEvents.map(event => (
            <Link
              key={event._id}  
              to={`/event-view/${event._id}`} 
              style={{ textDecoration: 'none' }}
            >
              <EventCard displayData={event} />  
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default AllEvents;
