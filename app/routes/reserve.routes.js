module.exports = app => {
    const booking = require("../controllers/booking.controller.js");
    const router = require("express").Router();
// Create a new booking

// Retrieve a single booking by ID
router.post("/", booking.create);



app.use('/api/reserve', router);
};