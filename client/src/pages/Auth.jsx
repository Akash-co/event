import React, { useState } from 'react';
import logo from '../assets/Logo.png';
import loginImg from '../assets/loginImg.png';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allApi';
import { CircularProgress } from '@mui/material';

const Auth = ({ insideRegister }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInput, setUserInput] = useState({
    username: "", phoneno: "", email: "", password: ""
  });
  const navigate = useNavigate();
  console.log(userInput);

  const register = async (e) => {
    e.preventDefault();
    if (userInput.username && userInput.phoneno && userInput.email && userInput.password) {
      // api call
      try {
        const result = await registerAPI(userInput);
        if (result.status === 200) {
          alert(`Welcome ${result.data?.username}, Please Login to book Events!!!`);
          navigate("/login");
          setUserInput({ username: "", phoneno: "", email: "", password: "" });
        } else {
          if (result.response.status === 406) {
            alert(result.response.data);
            setUserInput({ username: "", phoneno: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (userInput.email && userInput.password) {
      // api call
      try {
        const result = await loginAPI(userInput);
        if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setIsLogin(true);

          setTimeout(() => {
            if (userInput.email === "admin@gmail.com" && userInput.password === "admin123") {
              navigate("/booking-list");
            } else {
              navigate("/");
            }
            setUserInput({ email: "", password: "" });
            setIsLogin(false);
          }, 2000);
        } else {
          if (result.response.status === 404) {
            alert(result.response.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completely!!!");
    }
  };

  return (
    <>
      <div
        style={{ minHeight: '100vh', width: '100%', backgroundColor: 'rgba(220, 232, 255, 1)' }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="container w-75">
          <div className="row align-items-center">
            <div
              className="col-lg-6 border rounded-3 shadow mt-5"
              style={{ backgroundColor: 'rgba(150, 184, 250, 1)', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '500px' }}
            >
              <div className='d-flex justify-content-center'>
                <img src={logo} alt="Logo" className="img-fluid mb-4" />
              </div>
              <h4 className="text-center fw-bolder text-light fs-3 mb-4">
                Sign {insideRegister ? 'up' : 'in'} to your account
              </h4>
              <Form>
                {insideRegister && (
                  <div>
                    <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3">
                      <Form.Control value={userInput.username} onChange={e => setUserInput({ ...userInput, username: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInputUsername" label="PhoneNumber" className="mb-3">
                      <Form.Control value={userInput.phoneno} onChange={e => setUserInput({ ...userInput, phoneno: e.target.value })} type="text" placeholder="PhoneNumber" />
                    </FloatingLabel>
                  </div>
                )}
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                  <Form.Control value={userInput.email} onChange={e => setUserInput({ ...userInput, email: e.target.value })} type="email" placeholder="Email" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control value={userInput.password} onChange={e => setUserInput({ ...userInput, password: e.target.value })} type="password" placeholder="Password" />
                </FloatingLabel>
                {insideRegister ? (
                  <div className="mt-3">
                    <div className='d-flex justify-content-center'>
                      <Button onClick={register} variant="primary" className="shadow px-5 py-2 mb-2 rounded-pill">Sign Up</Button>
                    </div>
                    <p className="text-center text-light mt-2">Existing User? Please Click here to <Link to={'/login'}>Login</Link> </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className='d-flex justify-content-center'>
                      <Button onClick={login} variant="primary" className="shadow px-5 d-flex align-items-center py-2 mb-2 rounded-pill">
                        Sign In
                        {isLogin && <CircularProgress className='mx-2' color="success" />}
                      </Button>
                    </div>
                    <p className="text-center text-light mt-2">New User? Please Click here to <Link to={'/register'}>Register</Link> </p>
                  </div>
                )}
              </Form>
            </div>
            <div className="col-lg-6 d-flex justify-content-center align-items-center">
              <img src={loginImg} className='img-fluid rounded' style={{ maxWidth: '400px' }} alt="Login illustration" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
