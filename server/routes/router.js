const express = require('express');
const userController = require('../controllers/userController');
const eventController = require('../controllers/eventController');
const bookingController = require('../controllers/bookingController'); // Import bookingController
const multerMiddleware = require('../middlewares/multerMiddleware');
const adminBookingListController = require('../controllers/adminBookingListController');

// const {updateEventByIdController} = require("../controllers/updateEventController")
const authenticate = require('../middlewares/jwtMiddlewares');
const router = new express.Router();

// register - post
router.post('/register', userController.registerController);

// login - post
router.post('/login', userController.loginController);

// add event - post
router.post('/add-event',multerMiddleware.single('eventImage'),eventController.addEventController);

// get home events - get
router.get('/home-events',eventController.getHomeEventsController);

// get all events - get
router.get('/all-events', eventController.getAllEventsController);

// get event by id - get
router.get('/event-view/:id', eventController.getEventByIdController);

// add booking - post
router.post('/add-booking',bookingController.addBookingController); // Add booking route

// routes/router.js
router.get('/bookings/:userId', bookingController.getBookingsByUserId);


// Route to delete a booking
router.delete('/:bookingId', bookingController.deleteBookingController);

// adminBookingList - post
router.post('/booking-list',adminBookingListController.addAdminBookingListController);

// adminBookingList - get
router.get('/booking-list', adminBookingListController.getAllAdminBookingsController);

// delete card
router.delete('/events-list/:id', eventController.deleteEventByAdminController);

// router.put('/edit-event/:id', multerMiddleware.single('eventImage'), updateEventController);
// router.put("/:id", multerMiddleware.single('eventImage'), eventController.updateEventByAdminController);

// router.put("/update-event/:id", multerMiddleware.single("eventImage"), updateEventByIdController);

router.put("/update-event/:id",  multerMiddleware.single("eventImage"), eventController.updateEventController);


router.put('/user/:id', authenticate, userController.updateProfileController);

module.exports = router;
