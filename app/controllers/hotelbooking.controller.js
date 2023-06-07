const AirportClass = require("../models/hotelbooking.model");

//Create and Save a new Todo
exports.create = (req, res) => {

    // Validate request
   /*  if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } */

    var isValidResult = isValid(req, res);
    if (isValidResult === true) {
        // Create a Airport
        const airport = new AirportClass({
            codes: req.body.codes,
            city: req.body.city,
            latitude: req.body.latitude,
            longtitude: req.body.longtitude,
            kind: req.body.kind

        });

        // Save airport in the database
        AirportClass.create(airport, (err, data) => {
            console.log(err);
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the ToDo."
                });
            else res.status(201).send(data);
        });
    } else { 
        
        console.log("error in controller");
        var er = new Error("created errors");

                        res.status(209).send({
                    error:er.message || "Some error occurred while creating the ToDo."
                });
    } 
};

// Retrieve all Airports from the database (with condition).
exports.findAll = (req, res) => {
    const validSortOrders = ["codes", "city", "kind"];
    const sortBy = req.query.sortBy ? req.query.sortBy : "codes";// sort by codes if no sortOrder provided
    // console.log(sortBy + "inside controller findall");
    //  console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    // console.log(req.baseUrl);
    // console.log(req.method);
    if (!validSortOrders.includes(sortBy)) {
        res.status(400).send({
            message: "invalid sort order value"
        });
        return;
    }
    AirportClass.getAll(sortBy, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        else res.status(200).send(data);
    });
};

//Find a single airport by the codes
exports.findOne = (req, res) => {
    // console.log("inside controller findone:"+req.params.codes);
    AirportClass.findByCodes(req.params.codes, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found airport with codes ${req.params.codes}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving airport with codes ${req.params.codes}.`
                });
            }
        } else res.status(200).send(data);
    });
};

//Update a airport by codes
exports.update = (req, res) => {
    // Validate Request
    /* if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
//  */console.log("inside update");
    // console.log(req.params);
    // console.log(req.body);

    //record need to be exists(404) -->record not found
    if (isValid(req, res)) {
        AirportClass.updateByCodes(
            req.params.codes,
            new AirportClass(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found airport with codes ${req.params.codes}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating airport with codes " + req.params.codes
                        });
                    }
                } else res.status(200).send(data);
            }
        );
    }


};

//Delete a airport with codes
exports.delete = (req, res) => {
    AirportClass.remove(req.params.codes, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found airport with codes ${req.params.codes}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete airport with codes " + req.params.codes
                });
            }
        } else res.status(200).send({ message: true });
    });
};

function isValid(req, res) {

    var code = false;
    var city = false;
    var latitude = false;
    var msg = "";
    
 
    if (!req.body.codes.trim().match(/^[A-Z]{3,6}$/)) { 
        msg += "code must be all uppercase 3-6 characters!";
        code = true;
        // return false;     // try delete this sentence
    }

    if (!req.body.city.trim().match(/^.{1,40}$/)) { 
        msg += "city must between 1 and 40 characters!";
        city = true;
        // return false;     // try delete this sentence
    }

    if (req.body.latitude < -90 || req.body.latitude > 90) { 
        msg += "latitude must between -90 and 90!";

        latitude = true;
        // return false;     // try delete this sentence
    }
       

 
    if (code || city || latitude) {
        res.status(209).send({ message: msg });

        return false;

    } else
        return true;
    // var year = req.body.dueDate.slice(0, 4);

    // //console.log("isValid: ",res);
    // if (req.body.id) {
    //     res.status(400).send({
    //         message: "id is provided by System!!! ToDo not saved ;)",
    //         result: false
    //     });
    //     //console.log("if cond: ",res.send.result);
    //     return false;
    // }
    // if (req.body.task.length < 1 || req.body.task.length > 100) {
    //     res.status(400).send({ message: "too big/small task! need help? task not saved!!" });
    //     return false;
    // }
    // if (year < 1900 || year > 2099) {
    //     res.status(400).send({ message: "Not in the correct year range!!" });
    //     return false;

    // }
    // if (req.body.isDone != "Pending" && req.body.isDone !== "Done") {
    //     res.status(400).send({ message: "Not supported value in Is done ;)" });
    //     return false;

    // }
    

}