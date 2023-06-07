const db = require("./db.js");

// constructor
const AirportClass = function (airports) {
  this.codes = airports.codes;
  this.city = airports.city;
  this.latitude = airports.latitude;
  this.longtitude = airports.longtitude;
  this.kind = airports.kind;
};

//create a airport
AirportClass.create = (newAirports, result) => {
  db.query("INSERT INTO airports SET ?", newAirports, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created airports: ", { codes: res.codes, ...newAirports });
    result(null, { codes: res.codes, ...newAirports });
  });
};


//return one todo by id
AirportClass.findByCodes = (codes, result) => {
  // console.log("inside model:"+ codes);
  // FIXME: prevent SQL injection
  // db.query(`SELECT * FROM airports WHERE codes = ${code}`, (err, res) => {
   db.query(`SELECT * FROM airports WHERE codes = "${codes}"`, (err, res) => {
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

    // not found ToDO with the id
    result({ kind: "not_found" }, null);
  });
};

// return all todo[serach by task and return all if any]
AirportClass.getAll = (sortBy, result) => {
  /* var sql = "SELECT * FROM todos ORDER BY ??";
  var inserts = [sortOrder];
  var query = db.format(sql, inserts); */
  var query = db.format("SELECT * FROM airports ORDER BY ??", [sortBy]);
  // console.log("inside model getall:"+query);
 
  db.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("Airports: ", res);
    result(null, res);
    console.log("inside model db.query"+res);
  });
};

//update a airport 
AirportClass.updateByCodes = (codes, airport, result) => {
  // console.log("inside model");
  db.query(
    "UPDATE airports SET city = ?, latitude = ?, longtitude = ?, kind = ?  WHERE codes = ?",
    [airport.city, airport.latitude, airport.longtitude, airport.kind, codes],
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


//delete a airport
AirportClass.remove = (codes, result) => {
  
  db.query(`DELETE FROM airports WHERE codes = "${codes}"`, (err, res) => {
    if (err) {
      console.log("error: ", err); 
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found todo with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted airport with codes: ", codes);
    result(null, res);
  });
};


module.exports = AirportClass;