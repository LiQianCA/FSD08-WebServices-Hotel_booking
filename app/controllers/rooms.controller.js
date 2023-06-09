const Hotelroom = require("../models/rooms.model.js");

/* Create a new airport

exports.create = (req, res) => {
    const newAirport = new Airport({
      code: req.body.code,
      city: req.body.city,
      kind: req.body.kind,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
  
    // Validate the airport data
  
    Airport.create(newAirport, (err, airport) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(409).send({
            message: "Airport code or city already exists."
          });
        } else {
          res.status(500).send({
            message: err.message || "An error occurred while creating the airport."
          });
        }
      } else {
        res.status(201).send(airport);
      }
    });
  };
 */

// Retrieve all rooms sort by roomid
exports.findAll = (req, res) => {
  const sortBy = req.query.sortBy || 'RoomId';
  Hotelroom.getAll(sortBy, (err, hotelrooms) => {
    if (err) {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving hotelrooms."
      });
    } else {
      res.send(hotelrooms);
    }
  });
};

// Find a single hotelroom by primary key (RoomId)
exports.findOne = (req, res) => {
  const RoomId = req.params.RoomId;
  Hotelroom.findOne(RoomId, (err, hotelroom) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Hotelroom not found."
        });
      } else {
        res.status(500).send({
          message: "Error retrieving hotelroom"
        });
      }
    } else {
      if (!hotelroom) {
        res.status(404).send({
          message: "Hotelroom not found."
        });
      } else {
        res.send(hotelroom);
      }
    }
  });
};

// Update a hotelroom by roomid
exports.update = (req, res) => {
  const RoomId = req.params.RoomId;
  const updatedHotelroom = {
    RoomType: req.body.RoomType,
    PricePerNight: req.body.PricePerNight,
    RoomStatus: req.body.RoomStatus,
   };

  // Validate the hotelroom data

  Hotelroom.update(RoomId, updatedHotelroom, (err, hotelroom) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Hotelroom not found."
        });
      } else if (err.code === "ER_DUP_ENTRY") {
        res.status(409).send({
          message: "Hotelroom already exists."
        });
      } else {
        res.status(500).send({
          message: err.message || "An error occurred while updating the hotelroom."
        });
      }
    } else {
      if (!hotelroom) {
        res.status(404).send({
          message: "Hotelroom not found."
        });
      } else {
        res.send(hotelroom);
      }
    }
  });
};

/* Delete an airport by code
exports.delete = (req, res) => {
  const code = req.params.code;
  Airport.delete(code, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Airport not found."
        });
    } else {
      res.status(500).send({
        message: "Error deleting airport."
      });
    }
  } else {
    if (!result) {
      res.status(404).send({
        message: "Airport not found."
      });
    } else {
      res.send({ message: "Airport deleted successfully!" });
    }
  }
});
}; */
