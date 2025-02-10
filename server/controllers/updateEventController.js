// const events = require("../models/eventModel");
// // Adjust path if needed

// // Update Event by ID
// exports.updateEventByIdController = async (req, res) => {
//     console.log("Inside updateEventByIdController");
//     const { id } = req.params;
//     const { eventName, category, location, date, price, seatsAvailable, description, status, eventType } = req.body;

//     try {
//         const existingEvent = await events.findById(id);
//         if (!existingEvent) {
//             return res.status(404).json({ error: "Event not found" });
//         }

//         let eventImage = existingEvent.eventImage; // Keep old image if no new image is uploaded
//         if (req.file) {
//             eventImage = req.file.filename; // Assign new image filename
//         }

//         const updatedEvent = await events.findByIdAndUpdate(
//             id,
//             {
//                 eventImage,
//                 eventName,
//                 category,
//                 location,
//                 date,
//                 price,
//                 seatsAvailable,
//                 description,
//                 status,
//                 eventType,
//             },
//             { new: true }
//         );

//         return res.status(200).json(updatedEvent);
//     } catch (err) {
//         console.error("Error updating event:", err.message);
//         res.status(500).json({ error: "Server error" });
//     }
// };
