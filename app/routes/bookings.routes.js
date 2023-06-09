module.exports = app => {
    const booking = require("../controllers/bookings.controller.js");
    const router = require("express").Router();
// Create a new booking
router.post("/", booking.create);

// Retrieve all bookings
router.get("/", booking.findBooking);

// Retrieve a single booking by ID
router.get("/:bookingId", booking.findOne);

// Update a booking by ID
router.put("/:bookingId", booking.update);

// Delete a booking by ID
router.delete("/:bookingId", booking.delete);

app.use('/api/bookings', router);
};