
//Express is for building the Rest apis
const express = require("express");
const nocache = require('nocache');

//cors provides Express middleware to enable CORS with various options.
//const cors = require("cors");

//create an Express app
const app = express();

//logger npmlog
const logger = require("npmlog");
const BookingClass = require("./app/models/bookings.model.js");

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
app.use(nocache());
// console.log("app path:"+app.path());
//app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
console.log("app path:"+app.path());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// API endpoint to retrieve booking details by user ID
app.get('/api/bookings/:UserId', (req, res) => {
  const userId = req.params.UserId;
  
  // Query the database to retrieve booking details based on the user ID
  const query = 'SELECT * FROM bookings WHERE UserId = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error retrieving bookings:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/bookings', function(req, res) {
  var sortBy = req.query.sortBy; 
  
  var query = BookingClass.find().sort(sortBy);

  query.exec(function(err, bookings) {
      if (err) {
          res.status(500).json({ error: err.message });
      } else {
          res.json(bookings);
      }
  });
});


// app.get('/api/airports', (req, res) => {
//   logger.warn('From Npmlog', 'Npmlog is simple too %j', {'message': 'test'});
//   res.json({'message': 'Hello npmlog!'});
// });

/* // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDoS application." });
}); */
require("./app/routes/users.routes.js")(app);
require("./app/routes/rooms.routes.js")(app);
require("./app/routes/bookings.routes.js")(app);

app.use(express.static('static'));

// set port, listen for requests
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
