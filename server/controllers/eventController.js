const events = require("../models/eventModel");

// Add Event
exports.addEventController = async (req, res) => {
    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    }

    if (!req.file) {
        return res.status(400).json({ error: "Please upload an image" });
    }

    const { eventName, category, location, date, price, seatsAvailable, description, status, eventType } = req.body;
    const eventImage = req.file.filename;

    if (!eventName || !category || !location || !date || !price || !seatsAvailable || !description || !status || !eventType || !eventImage) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const newEvent = new events({
            eventImage,
            eventName,
            category,
            location,
            date,
            price,
            seatsAvailable,
            description,
            status,
            eventType
        });

        const savedEvent = await newEvent.save();
        return res.status(200).json(savedEvent);
    } catch (err) {
        return res.status(500).json({ error: "Error saving event" });
    }
};

// Get home events
exports.getHomeEventsController = async (req, res) => {
    console.log("Inside getHomeEventsController");
    try {
        const allHomeEvents = await events.find().limit(6);
        res.status(200).json(allHomeEvents);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get all events
exports.getAllEventsController = async (req, res) => {
    console.log("Inside getAllEventsController");
    try {
        const allEvents = await events.find();
        res.status(200).json(allEvents);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get event by ID
exports.getEventByIdController = async (req, res) => {
    console.log("Inside getEventByIdController");
    const { id } = req.params;
    try {
        const event = await events.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error("Error fetching event by ID:", err);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete Event by Admin
exports.deleteEventByAdminController = async (req, res) => {
    console.log("Inside deleteEventByAdminController");
    const { id } = req.params;

    try {
        const event = await events.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ error: "Event Not Found" });
        }
        return res.status(200).json({ message: `${event.eventName} deleted successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred in backend" });
    }
};

    // Update Event
    exports.updateEventController = async (req, res) => {
        console.log("Inside updateEventController");
        const { id } = req.params;
        const { eventName, category, location, date, price, seatsAvailable, description, status, eventType } = req.body;
        let eventImage = req.file ? req.file.filename : null;
    
        try {
            const event = await events.findById(id);
            if (!event) {
                return res.status(404).json({ error: "Event not found" });
            }
    
            // Update event details
            event.eventName = eventName || event.eventName;
            event.category = category || event.category;
            event.location = location || event.location;
            event.date = date || event.date;
            event.price = price || event.price;
            event.seatsAvailable = seatsAvailable || event.seatsAvailable;
            event.description = description || event.description;
            event.status = status || event.status;
            event.eventType = eventType || event.eventType;
            if (eventImage) {
                event.eventImage = eventImage;
            }
    
            const updatedEvent = await event.save();
            return res.status(200).json(updatedEvent);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Error updating event" });
        }
    };

    

