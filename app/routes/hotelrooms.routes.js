module.exports = app => {
    const hotelrooms = require("../controllers/hotelrooms.controller.js");
    const router = require("express").Router();
  
    // Create a new room
    //router.post("/", hotelrooms.create);
  
    // Retrieve all rooms
    router.get("/", hotelrooms.findAll);
  
    // Retrieve a single hotelrooms with roomid
    router.get("/:id", hotelrooms.findOne);
  
    // Update an airport with code
    router.put("/:id", hotelrooms.update);
  
    // Delete an airport with code
    //router.delete("/:code", airports.delete);
  
    app.use('/api/hotelrooms', router);
  };