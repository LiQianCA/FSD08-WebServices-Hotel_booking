const db = require("./db.js");
// Booking section
// constructor
const BookingClass = function (booking) {
    this.CheckInDate = booking.CheckInDate;
  this.CheckOutDate = booking.CheckOutDate;
  this.RoomId = booking.RoomId;
    // this.BookingStatus = booking.BookingStatus;
    // this.BookingBills = booking.BookingBills;
    // this.PaymentStatus = booking.PaymentStatus;
    };
    
    // create a hotel booking
    BookingClass.create = (newBooking, result) => {
    db.query("INSERT INTO bookings SET ?", newBooking, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }
    console.log("created booking: ", { id: res.insertId, ...newBooking });
    result(null, { id: res.insertId, ...newBooking });
    });
  };
  
  // retrieve a hotel booking by ID
  BookingClass.findById = (bookingId, result) => {
    db.query(`SELECT * FROM bookings WHERE BookingId = ${bookingId}`, (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
    }
    if (res.length) {
      console.log("found booking: ", res[0]);
      result(null, res[0]);
      return;
    }
    
    // booking with the given ID not found
    result({ kind: "not_found" }, null);
    });
    };
  
    // update a hotel booking by ID
    BookingClass.updateById = (bookingId, booking, result) => {
    db.query(
    "UPDATE hotel_bookings SET CheckInDate = ?, CheckOutDate = ?, BookingStatus = ?, BookingBills = ?, PaymentStatus = ? WHERE id = ?",
    [booking.CheckInDate, booking.CheckOutDate, booking.BookingStatus, booking.BookingBills, booking.PaymentStatus, bookingId],
    (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }
    if (res.affectedRows == 0) {
      // booking with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }
  
    console.log("updated booking: ", { id: bookingId, ...booking });
    result(null, { id: bookingId, ...booking });
  }
  );
  };
  
  // delete a hotel booking by ID
  BookingClass.remove = (bookingId, result) => {
  db.query(`DELETE FROM bookings WHERE id = ${BookingId}`, (err, res) => {
  if (err) {
  console.log("error: ", err);
  result(null, err);
  return;
  }
  if (res.affectedRows == 0) {
    // booking with the given ID not found
    result({ kind: "not_found" }, null);
    return;
  }
  
  console.log("deleted booking with ID: ", bookingId);
  result(null, res);
  });
  };
  
  module.exports = BookingClass;
  