module.exports = app => {
    const airports = require("../controllers/hotelbooking.controller.js");
  
    var router = require("express").Router();
  console.log("vscode");

  console.log(app.mountpath);
    // Create a new airport
  //POST /api/airports - create a record, code and city must not be in use, otherwise 209
    router.post("/", airports.create);
  
    // Retrieve all airports, sort by airport code
  //GET /api/airports?sortBy=column where column is: code, city, kind
    router.get("/", airports.findAll);
  
    // Retrieve a single airport by primary key (code)
    router.get("/:codes", airports.findOne);
  
    // Update a ToDo with id
    router.put("/:codes", airports.update);
  
    // Delete a ToDo with id
    router.delete("/:codes", airports.delete);
  
    app.use('/api/airports', router);
  };