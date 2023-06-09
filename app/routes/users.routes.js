module.exports = app => {
    const user = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  // console.log("vscode");
const bcrypt = require('bcrypt');
  // console.log(app.mountpath);
    // Create a new airport
  //POST /api/airports - create a record, code and city must not be in use, otherwise 209
    router.post("/", user.create);
  
    // Retrieve all airports, sort by airport code
    router.get("/", user.findMe);
   
    // Retrieve a single airport by primary key (code)
    router.get("/:email", user.findOne);
  
    // Update a ToDo with id
    router.put("/:codes", user.update);
  
    // Delete a ToDo with id
    router.delete("/:codes", user.delete);
  
    app.use('/api/users', router);
  };