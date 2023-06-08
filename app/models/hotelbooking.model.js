const db = require("./db.js");

// constructor
const UserClass = function (user) {
  this.UserEmail = user.UserEmail;
  this.Password = user.Password;
  this.FirstName = user.FirstName;
  this.LastName = user.LastName;
  this.UserAddress = user.UserAddress;
  this.UserTel = user.UserTel;
  this.Role = user.Role;
};

//create a user
UserClass.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { UserEmail: res.UserEmail, ...newUser });
    result(null, { UserEmail: res.UserEmail, ...newUser });
  });
};


//return one user by email
UserClass.findByEmail = (UserEmail, result) => {

   db.query(`SELECT * FROM users WHERE UserEmail = "${UserEmail}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found airport: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the email
    result({ kind: "not_found" }, null);
  });
};

// return all users
UserClass.findLoginUser = (req,result) => {
  console.log(req.body);

  var query = db.format("SELECT * FROM users WHERE UserEmail="+req.body.UserEmail+" AND Password="+req.body.Password);
 
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  
    result(null, res);
  });
};

//update a user 
UserClass.updateByCodes = (codes, room, result) => {
  db.query(
    "UPDATE airports SET city = ?, latitude = ?, longtitude = ?, kind = ?  WHERE codes = ?",
    [room.city, room.latitude, room.longtitude, room.kind, codes],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      //problem affectedRows
      if (res.affectedRows == 0) {
        // not found todo with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated airport: ", { codes: codes, ...airport });
      result(null, { codes: codes, ...airport });
    }
  );
};


//delete a user
UserClass.remove = (email, result) => {
  
  db.query(`DELETE FROM users WHERE UserEmail = "${email}"`, (err, res) => {
    if (err) {
      console.log("error: ", err); 
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the email
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with email: ", email);
    result(null, res);
  });
};


module.exports = UserClass;

// Booking section
// constructor
const BookingClass = function (booking) {
  this.CheckInDate = booking.CheckInDate;
  this.CheckOutDate = booking.CheckOutDate;
  this.BookingStatus = booking.BookingStatus;
  this.BookingBills = booking.BookingBills;
  this.PaymentStatus = booking.PaymentStatus;
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

  