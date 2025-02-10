import React, { useEffect, useState } from "react";
import SideNavbar from "../components/SideNavbar";
import logo from "../assets/Logo.png";
import { Container, Navbar, Row, Col, Form, Button, Card } from "react-bootstrap";
import uploadImg from "../assets/uploadImg.jpg";
import { addEventAPI } from "../services/allApi";


const AddEvent = () => {
  const [preview, setPreview] = useState("");
  const [uploadFileStatus, setUploadFileStatus] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventImage: "", eventName: "",category: "",location: "", date: "",price: "",seatsAvailable: "", description: "", status: "",eventType: "",
  });
  console.log(eventDetails);

  useEffect(() => {
    if (eventDetails.eventImage.type == "image/png" ||eventDetails.eventImage.type == "image/jpg" || eventDetails.eventImage.type == "image/jpeg" ) {
      setUploadFileStatus(true);
      setPreview(URL.createObjectURL(eventDetails.eventImage));
    } else   {
      setUploadFileStatus(false);
       setEventDetails({ ...eventDetails, eventImage: "" });
    }
  }, [eventDetails.eventImage]);

  const handleClear = () => {
    setPreview("");
    setUploadFileStatus(false);
    setEventDetails({
      eventImage: "",
      eventName: "",
      category: "",
      location: "",
      date: "",
      price: "",
      seatsAvailable: "",
      description: "",
      status: "",
      eventType: "",
    });
  };

  const handleAddEvent = async () => {
    console.log(eventDetails);
    const { eventImage, eventName, category, location, date, price, seatsAvailable, description, status, eventType } = eventDetails;

    if (eventImage && eventName && category && location && date && price && seatsAvailable && description && status && eventType) {
      // Prepare form data
      const reqBody = new FormData();
      reqBody.append("eventImage", eventImage);
      reqBody.append("eventName", eventName);
      reqBody.append("category", category);
      reqBody.append("location", location);
      reqBody.append("date", date);
      reqBody.append("price", price);
      reqBody.append("seatsAvailable", seatsAvailable);
      reqBody.append("description", description);
      reqBody.append("status", status);
      reqBody.append("eventType", eventType);

      const reqHeader = {
        "Content-Type": "multipart/form-data",
      }
      // make api call
      try{
        const result = await addEventAPI(reqBody,reqHeader)
        console.log(result);
        
        if(result.status == 200){
          alert(`${result?.data?.eventName} added successfully!!!`)
          handleClear()
        }else{
          if(result.response.status==406){
            alert(result.response.data)
          }
        }
      }catch(err){
        console.log(err);
        
      }
    }else{
      alert("All fields are required!!!")
    }

      
 
          
      
    
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow">
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} alt="Logo" style={{ height: "50px" }} />
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div className="d-flex">
        <SideNavbar />
        <Container className="p-4">
          <h3 className="mb-4 fw-bold">Add Event</h3>
          <Card className="p-4 shadow-sm">
            <Row>
              <Col md={5} className="d-flex mx-5 justify-content-center align-items-center">
                <label>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={e => setEventDetails({ ...eventDetails, eventImage: e.target.files[0] })}
                  />
                  <img width={"200px"} src={preview?preview:uploadImg} alt="" />
                </label>
            {  
            !uploadFileStatus &&
            <div className="text-danger fw-bolder">Upload only (jpeg,png,jpg) files only!!!</div>
            }
              </Col>
              <Col md={9}>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter event name"
                          value={eventDetails.eventName}
                          onChange={e => setEventDetails({ ...eventDetails, eventName: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          value={eventDetails.category}
                          onChange={e => setEventDetails({ ...eventDetails, category: e.target.value })}
                        >
                          <option>Select category</option>
                          <option>Concert</option>
                          <option>Workshop</option>
                          <option>Conference</option>
                          <option>Sports</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter location"
                          value={eventDetails.location}
                          onChange={e => setEventDetails({ ...eventDetails, location: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="text" placeholder="dd/mm/yyyy"
                          value={eventDetails.date}
                          onChange={e => setEventDetails({ ...eventDetails, date: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter price"
                          value={eventDetails.price}
                          onChange={e => setEventDetails({ ...eventDetails, price: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Seats Available</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Number of seats"
                          value={eventDetails.seatsAvailable}
                          onChange={e => setEventDetails({ ...eventDetails, seatsAvailable: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Write about the event"
                          value={eventDetails.description}
                          onChange={e => setEventDetails({ ...eventDetails, description: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          value={eventDetails.status}
                          onChange={e => setEventDetails({ ...eventDetails, status: e.target.value })}
                        >
                          <option>Select status</option>
                          <option>Available</option>
                          <option>Unavailable</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Event Type</Form.Label>
                        <Form.Select
                          value={eventDetails.eventType}
                          onChange={e => setEventDetails({ ...eventDetails, eventType: e.target.value })}
                        >
                          <option>Select type</option>
                          <option>Popular Events</option>
                          <option>Upcoming Events</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button onClick={handleAddEvent} variant="primary" className="mt-2">
                    Submit
                  </Button>
                  <Button onClick={handleClear} className="btn btn-danger mt-2 mx-5">
                    Clear
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AddEvent;
