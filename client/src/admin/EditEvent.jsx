import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventByIdAPI, updateEventAPI } from "../services/allApi";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        eventName: "",
        category: "",
        location: "",
        date: "",
        price: "",
        seatsAvailable: "",
        description: "",
        status: "",
        eventType: "",
        eventImage: null
    });

    useEffect(() => {
        fetchEventDetails();
    }, []);

    const fetchEventDetails = async () => {
        try {
            const result = await getEventByIdAPI(id);
            if (result.status === 200) {
                setEventData(result.data);
            }
        } catch (err) {
            console.error("Error fetching event:", err);
        }
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, eventImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(eventData).forEach((key) => {
            formData.append(key, eventData[key]);
        });

        try {
            const result = await updateEventAPI(id, formData, { "Content-Type": "multipart/form-data" });
            if (result.status === 200) {
                alert("Event updated successfully!");
                navigate("/events-list");
            }
        } catch (err) {
            console.error("Error updating event:", err);
        }
    };

    return (
        <Container className="p-4">
            <h3 className="mb-4 fw-bold">Edit Event</h3>
            <Card className="p-4 shadow-sm">
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="eventName"
                                    value={eventData.eventName}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={eventData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    value={eventData.location}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={eventData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={eventData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Seats Available</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="seatsAvailable"
                                    value={eventData.seatsAvailable}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="status"
                                    value={eventData.status}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Event Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="eventType"
                                    value={eventData.eventType}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Event Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="eventImage"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mt-2">
                        Update Event
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default EditEvent;
