import React from 'react';
import smallCircle from "../assets/Ellipse 794.png";
import bigCircle from "../assets/bigCircle.png";
import contact from "../assets/contact.jpg";
import Header from '../components/Header'

import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';

const ContactUs = () => {
  return (
    <>
    <Header/>
      <div style={{ paddingTop: '100px' }} className="d-flex justify-content-center align-items-center text-center">
        <h1 className="text-primary" style={{ fontFamily: '"Hubot Sans", serif', fontWeight: '700', fontSize: '3rem', letterSpacing: '0.05em' }}>
          Contact Us
        </h1>
      </div>
      <div style={{ paddingTop: '10px' }} className="d-flex justify-content-center align-items-center text-center">
        <h5 className='fw-bolder'>Any questions or remarks? Just write us a message</h5>
      </div>
      <div className="row container d-flex justify-content-between ms-5 mt-5">
        <div style={{ position: 'relative' }} className="col-lg-5 border rounded bg-primary text-light ms-5 pb-5">
          <h3 style={{ fontFamily: '"Hubot Sans", serif', fontWeight: '700', fontSize: '2.5rem' }} className="pt-5 ps-5  fw-bolder">Contact Information</h3>
          <h5 className="pt-1 ps-5 ms-2 fw-bolder">Say something to start a live chat</h5>
          <p className="ps-5" style={{ paddingTop: '60px' }}>
            <i className="fa-solid fa-phone" style={{ marginRight: '50px' }}></i>
            +94 111111111
          </p>
          <p className="ps-5" style={{ paddingTop: '10px' }}>
            <i className="fa-solid fa-envelope" style={{ marginRight: '50px' }}></i>
            akashahamed2000@gmail.com
          </p>
          <p className="ps-5" style={{ paddingTop: '10px', textAlign: 'justify' }}>
            <i className="fa-solid fa-location-dot" style={{ marginRight: '50px' }}></i>
            123,colombo <br />
            <span className="ps-5 ms-3"> colombo, Srilanka</span>
          </p>

          <div className="ps-5" style={{ paddingTop: '30px' }}>
            <h5 className="fw-bolder">Office Hours</h5>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>

          <div className="ps-5" style={{ paddingTop: '20px' }}>
            <h5 className="fw-bolder">Follow Us</h5>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fa-brands fa-facebook fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fa-brands fa-twitter fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fa-brands fa-instagram fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="fa-brands fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>

          <img
            src={smallCircle}
            alt="Small Circle"
            style={{
              position: 'absolute',
              bottom: '100px',
              right: '100px'
            }}
          />
          <img
            src={bigCircle}
            alt="Big Circle"
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '200px',
              height: '200px'
            }}
          />
        </div>

        <div style={{ paddingTop: '50px' }} className="col-lg-6 ">
       <img src={contact} className='img-fluid' alt="" />

        </div>
      </div>
    </>
  );
};

export default ContactUs;
