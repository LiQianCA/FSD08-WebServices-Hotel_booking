//Express is for building the Rest apis
const express = require("express");
const nocache = require('nocache');

//cors provides Express middleware to enable CORS with various options.
//const cors = require("cors");

//create an Express app
const app = express();

//logger npmlog
const logger = require("npmlog");

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
  const userId = req.params.userId;
  
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

// app.get('/api/airports', (req, res) => {
//   logger.warn('From Npmlog', 'Npmlog is simple too %j', {'message': 'test'});
//   res.json({'message': 'Hello npmlog!'});
// });

/* // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDoS application." });
}); */
require("./app/routes/hotelbooking.routes.js")(app);
require("./app/routes/hotelrooms.routes.js")(app);
require("./app/routes/hotelreserve.routes.js")(app);

app.use(express.static('static'));

// set port, listen for requests
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
