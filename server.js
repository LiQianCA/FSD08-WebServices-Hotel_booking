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
//   origin: "http://hostname=fsd08webservices.mysql.database.azure.com:8081"
// };

app.use(nocache());
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
console.log("app path:"+app.path());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


/* // simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to hotelbooking application." });
}); */
require("./app/routes/hotelbooking.routes.js")(app);

app.use(express.static('static'));

// set port, listen for requests
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
