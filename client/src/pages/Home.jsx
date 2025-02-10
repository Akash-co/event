import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import car1 from '../assets/carousel1.jpg';
import car2 from '../assets/carousel2.jpg';
import car3 from '../assets/carousel3.jpg';

import Header from '../components/Header';
import landingImg from '../assets/landingImg.png';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { homeEventAPI } from '../services/allApi';

const Home = () => {
 const [username,setUsername] =useState("")
  const [isLogin, setIsLogin] = useState(false)
   const[homeEvents,setHomeEvents]=useState([])

console.log(homeEvents);


  useEffect(() => {
    getHomeEvents()
    if (sessionStorage.getItem("token")) {
      setUsername(JSON.parse(sessionStorage.getItem("user")).username.split(" ")[0])
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])


  const getHomeEvents = async () => {
    try{
      const result = await homeEventAPI()
      console.log(result)
      if(result.status==200){
        setHomeEvents(result.data)
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <Header />
      <div className="position-relative" style={{ height: '100vh', textAlign: 'center' }}>
        {/* Landing Image */}
        <img
          src={landingImg}
          style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          alt="Eventify Landing Image"
          className="img-fluid"
        />

        {/* Text Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '150px',
            left: '50%',
            fontFamily: '"Hubot Sans", serif',
            fontWeight: '500',
            transform: 'translate(-50%, 0)',
            zIndex: '2',
            whiteSpace: 'nowrap',
          }}
          className="text-center text-primary p-3"
        >
          <h1 className="fw-bolder text-dark">Welcome to Event!, <span className='text-primary'>{username}</span></h1>
          <h1 style={{ fontSize: '40px' }} className="fw-bold">
            <span style={{ fontSize: '50px' }} className="text-dark fw-bolder">E</span>xperience,
            <span style={{ fontSize: '50px' }} className="text-dark fw-bolder">V</span>ibrancy,
            <span style={{ fontSize: '50px' }} className="text-dark fw-bolder">E</span>xcellence,
            <span style={{ fontSize: '50px' }} className="text-dark fw-bolder">N</span>etworking,
            <span style={{ fontSize: '50px' }} className="text-dark fw-bolder">T</span>hrills.
          </h1>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3" style={{ padding: '10px 0' }}>
          {
            isLogin ? 
            <Link to={'/all-events'} className="btn btn-primary px-4 py-3 mt-5">
            Book Your Events
            </Link>
            :
            <Link to={'/login'} className="btn btn-primary px-4 py-3 mt-5">
            Login to Book Your Spot
          </Link>
            }
        </div>

      </div>

      <div className="d-flex justify-content-between px-3 px-md-5 align-items-center">
        <h3 className="ms-3 ps-md-5 display-6 fw-bolder text-dark display-md-4">
          <span className='text-primary'>O</span>ur <span className='text-primary'>E</span>vents
        </h3>
        <Link to={'/all-events'}>
          <button className="btn btn-link pe-3 pe-md-5 text-decoration-none">
            View More..
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </Link>
      </div>
      <div className="container d-flex justify-content-between align-items-center mt-5 gap-4 flex-wrap">

       {
        homeEvents.map(event=>(
          <Link key={event._id} to={`/event-view/${event._id}`} style={{ textDecoration: 'none' }}  >
          <EventCard displayData={event} />
        </Link>
        ))
   
}
      </div>

    

      <div className="mt-5 mb-5">
        <h3 className="container text-center display-6 fw-bolder text-dark mb-4">
          <span className="text-primary">H</span>ighlight <span className="text-primary">M</span>oments
        </h3>

        <Carousel
          className="mt-4"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            borderRadius: '15px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
          }}
        >
          <Carousel.Item interval={1500} style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
                zIndex: '1',
              }}
            ></div>
            <img
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              src={car1}
              alt="First slide"
              className="d-block"
            />
            <Carousel.Caption style={{ zIndex: '2' }}>
              <h3 className="fw-bold text-uppercase">Memorable Event</h3>
              <p className="fst-italic">
                Reliving the best moments from our special highlights.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1500} style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
                zIndex: '1',
              }}
            ></div>
            <img
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              src={car2}
              alt="Second slide"
              className="d-block"
            />
            <Carousel.Caption style={{ zIndex: '2' }}>
              <h3 className="fw-bold text-uppercase">Unforgettable Journey</h3>
              <p className="fst-italic">
                Celebrating every milestone with joy and laughter.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={1500} style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
                zIndex: '1',
              }}
            ></div>
            <img
              style={{ width: '100%', height: '500px', objectFit: 'cover' }}
              src={car3}
              alt="Third slide"
              className="d-block"
            />
            <Carousel.Caption style={{ zIndex: '2' }}>
              <h3 className="fw-bold text-uppercase">Cherished Memories</h3>
              <p className="fst-italic">
                Creating stories that last a lifetime.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>



    </>
  );
};

export default Home;
