module.exports = app => {
    const user = require("../controllers/users.controller.js");
  
    var router = require("express").Router();

    router.post("/", user.create);
  
    // Retrieve all airports, sort by airport code
    router.get("/", user.execIfAuthValid);
   
    // Retrieve a single airport by primary key (code)
    router.get("/:email", user.findOne);
  
    // Update a ToDo with id
    router.put("/:codes", user.update);
  
    // Delete a ToDo with id
    router.delete("/:codes", user.delete);
  
    app.use('/api/users', router);
    app.use('/api/rooms', router);
  };