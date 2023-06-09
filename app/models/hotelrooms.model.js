const db = require("./db.js");

// Constructor
const Hotelroom = function (hotelroom) {
  this.RoomId = hotelroom.RoomId;               
  this.RoomType = hotelroom.RoomType;
  this.PricePerNight = hotelroom.PricePerNight;
  this.RoomStatus = hotelroom.RoomStatus;
  };

// Retrieve all hotelrooms, sorted by hotelroom id
Hotelroom.getAll = (sortBy, result) => {
  const query = db.format("SELECT * FROM hotelrooms ORDER BY ??", [sortBy]);
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, res);
  });
};

// Retrieve a single hotelroom by primary key (roomid)
Hotelroom.findOne = (RoomId, result) => {
  const query = db.format("SELECT * FROM hotelrooms WHERE RoomId = ?", [RoomId]);
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};

/* Create a new hotelroom
Airport.create = (newAirport, result) => {
  db.query("INSERT INTO airports SET ?", newAirport, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created airport: ", { code: res.insertCode, ...newAirport });
    result(null, { code: res.insertCode, ...newAirport });
  });
};  */

// Update a hotelroom by roomid
Hotelroom.update = (RoomId, updatedHotelroom, result) => {
  db.query(
    "UPDATE hotelrooms RoomType = ?, PricePerNight = ?, RoomStatus = ? WHERE RoomId = ?", 
    [updatedHotelroom.RoomType, updatedHotelroom.PricePerNight, updatedHotelroom.RoomStatus, RoomId],  
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated hotelroom: ", { RoomId: RoomId, ...updatedHotelroom });
      result(null, { RoomId: RoomId, ...updatedHotelroom });
    }
  );
};

/* Delete an airport by code
Airport.delete = (code, result) => {
    db.query("DELETE FROM airports WHERE code = ?", code, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted airport with code: ", code);
      result(null, res);
    });
  };    */
  
module.exports = Hotelroom;
