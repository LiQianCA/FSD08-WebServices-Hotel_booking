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
UserClass.findByUserEmail = (UserEmail, result) => {
  console.log("inside findbyuser email model:"+UserEmail);

   db.query(`SELECT * FROM users WHERE UserEmail = "${UserEmail}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the email
    result({ kind: "not_found" }, null);
  });
};

// return all users
UserClass.findByEmailBooking = (email,result) => {
 
  var query = db.format(`select * from bookings b join users u on b.userId=u.userId where u.UserEmail ="${email}"`);
  // var query = db.format(`SELECT * FROM bookings WHERE BookingId="1"`);
 
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
  
    result(null, res);
    // console.log("inside findbyEmailBooking model:"+res);
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

UserClass.findAvaRooms = (chi,cho, result) => {
  console.log("inside findavarooms model：" + chi + cho);
  let queryava = db.format(`select * from hotelrooms where RoomId not in(select RoomId from bookings where (('${chi}'<CheckOutDate AND '${chi}'>CheckInDate) ||('${cho}'<CheckOutDate AND '${cho}'>CheckInDate) || ('${chi}'<CheckInDate AND '${cho}'>CheckOutDate)))`);
  db.query(queryava, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
       console.log(res);
       if (res.length) {
         console.log(res.length);
        // console.log("found user: ", res);
      result(null, res);
      return;
       }
       
        result({ kind: "not_found" }, null);

  
  });
};

module.exports = UserClass;


  