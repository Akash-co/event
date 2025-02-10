import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png'

const Footer = () => {
  return (
    <div className='mt-5 container w-100'>
      <div className='d-flex flex-wrap justify-content-between'>
        {/* intro */}
        <div style={{ width: '400px' }} className='mb-3'>
          <h5 className='fw-bolder text-primary'>
           <img src={logo} alt="" />
          </h5>
          <p>Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.</p>
          <p>Code licensed MIT, docs CC BY 3.0.</p>
          <p>Currently v5.3.3.</p>
        </div>
        {/* links */}
        <div className="d-flex flex-column mb-3">
          <h5>Links</h5>
          <Link to='/'  style={{ textDecoration: 'none' }}>Home Page</Link>
          <Link to='/login' style={{ textDecoration: 'none' }}>login Page</Link>
          <Link to='/register'  style={{ textDecoration: 'none' }}>Register</Link>
          <Link to='/services' style={{ textDecoration: 'none' }}>Services</Link>
          <Link to='/contact-us'  style={{ textDecoration: 'none' }}>Contact Us</Link>
        </div>
        {/* guides */}
        <div className="d-flex flex-column mb-3">
          {/* <h5>Guides</h5> */}
          {/* <a href="https://react.dev/" target='_blank' style={{ textDecoration: 'none' }}>React</a>
          <a href="https://reactrouter.com/en/main" target='_blank'style={{ textDecoration: 'none' }}>React Router</a>
          <a href="https://react-bootstrap.netlify.app/" target='_blank'  style={{ textDecoration: 'none' }}>React Bootstrap</a> */}
        </div>
        {/* contact */}
        <div className="d-flex flex-column mb-3">
          <h5>Contact</h5>
          <div className="d-flex">
            <input placeholder='Enter your Email here!!' type="text" className="form-control me-2" />
            <button className='btn btn-light'>
              <i className="fa-solid fa-circle-arrow-right"></i>
            </button>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <a href="#" target='_blank'><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.instagram.com/welcome.ai/?hl=en" target='_blank' ><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.facebook.com/" target='_blank' ><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.linkedin.com/mynetwork/grow/" target='_blank'><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://github.com/" target='_blank' ><i className="fa-brands fa-github"></i></a>
            <a href="https://github.com/" target='_blank' ><i className="fa-solid fa-phone"></i></a>
          </div>
        </div>
      </div>
      <p className='text-center mt-3'>Copyright &copy;Event Booking & Ticket Managment App  .</p>
    </div>
  );
};

export default Footer;
