module.exports = app => {
  const user = require("../controllers/hotelbooking.controller.js");

  var router = require("express").Router();
  // console.log("vscode");

  // console.log(app.mountpath);
  // Create a new airport
  //POST /api/airports - create a record, code and city must not be in use, otherwise 209
  router.post("/", user.create);

  // Retrieve all airports, sort by airport code
  //GET /api/airports?sortBy=column where column is: code, city, kind
  router.get("/", user.findUser);

  // Retrieve a single airport by primary key (code)
  router.get("/:email", user.findOne);

  // Update a ToDo with id
  router.put("/:codes", user.update);

  // Delete a ToDo with id
  router.delete("/:codes", user.delete);

  app.use('/api/users', router);




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