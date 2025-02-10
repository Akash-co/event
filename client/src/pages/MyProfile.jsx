
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import { updateUserAPI } from '../services/allApi';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phoneno, setPhoneno] = useState("")
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
  if(sessionStorage.getItem("user")){
    const users = JSON.parse(sessionStorage.getItem("user"))
    setUsername(users.username.split(" ")[0])
    setEmail(users.email)
    setPhoneno(users.phoneno  || "")
  }
  }, []); 


//   const handleSave = async () => {
//     const token = sessionStorage.getItem('token');
//     const profileData = { username, phoneno };

//     try {
//         const response = await updateUserAPI(profileData, token);
//         alert(response.message);
//         sessionStorage.setItem('user', JSON.stringify(response.user));
//         navigate('/my-profile');
//     } catch (err) {
//         alert('Error updating profile. Please try again.');
//     }
// };

const handleSave = async () => {
  const userId = JSON.parse(sessionStorage.getItem("user"))._id;  
  const updatedUser = { username, phoneno };

  try {
      const result = await updateUserAPI(userId, updatedUser);  
      if (result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          alert("Profile Updated Successfully");
          setShow(false);
      }
  } catch (err) {
      console.log(err);
      alert("Failed to update, please try again.");
  }
};


  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className="container ">
        <h1 style={{
          fontFamily: '"Hubot Sans", serif',
          fontWeight: '500',
          fontSize: '3.5rem',
          opacity: 0.9,
          marginBottom: '10px',
        }} className='fw-bolder'>My <span className='text-primary fw-bolder'>Profile</span></h1>
        <h4 className='mt-5'>Contact Information</h4>
        <hr />
        <p className='text-dark fw-bolder'>Username : <span className='mx-3 text-primary'>{username}</span></p>
        <p className='text-dark fw-bolder'>Email : <span className='mx-5 text-primary'>{email}</span></p>
        <p className='text-dark fw-bolder'>Phone No : <span className='mx-3 text-primary'>{phoneno}</span></p>
        <Button onClick={handleShow} className='rounded-pill px-4' variant="success">Edit</Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className='text-dark fw-bolder'><span className='text-primary'>My</span> Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Username:</InputGroup.Text>
        <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            aria-label="Username"
            aria-describedby="basic-addon1"
        />
    </InputGroup>

    <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Phone No:</InputGroup.Text>
        <Form.Control
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}  
            aria-label="Phone No"
            aria-describedby="basic-addon1"
        />
    </InputGroup>
</Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" className='bg-danger' onClick={handleClose}>
              Cancel
            </Button>
            <Button className='bg-success' onClick={handleSave}   variant="primary">Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default MyProfile