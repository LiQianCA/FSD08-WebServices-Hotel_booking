const UserClass = require("../models/users.model");
const Auth = require("../utils/auth");
//Create and Save a new user
exports.create = (req, res) => {

        // Create a user
        const user = new UserClass({
            UserEmail: req.body.UserEmail,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            UserTel: req.body.UserTel,
            UserAddress: req.body.UserAddress,
            Password: Auth.hash(req.body.Password),
            Role:req.body.Role
           

        });

        // Save user in the database
        UserClass.create(user, (err, data) => {
            console.log(err);
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the user."
                });
            else res.status(201).send(data);
        });


};


exports.findMe = (req, res) => {
    console.log("inside findme:"+req.dir);
    Auth.execIfAuthValid(req, res, null, (req, res, user) => {
        res.status(200).send(user);
    });
};


// Retrieve all users from the database (with condition).
exports.findUser = (req, res) => {
    console.dir("inside controller finduser："+req.body.params);
   
    UserClass.findLoginUser(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        else res.status(200).send(data);
    });
};

//Find a single user by the email
exports.findOne = (req, res) => {
    console.dir(req.body.params);
    UserClass.findByEmailBooking(req.params.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with Email ${req.params.UserEmail}.`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving user with Email ${req.params.UserEmail}.`
                });
            }
        } else res.status(200).send(data);
    });
};

//Update a user by email
exports.update = (req, res) => {

    if (isValid(req, res)) {
        UserClass.updateByCodes(
            req.params.UserEmail,
            new UserClass(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found user with email ${req.params.UserEmail}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating user with email " + req.params.UserEmail
                        });
                    }
                } else res.status(200).send(data);
            }
        );
    }


};

//Delete a user with email
exports.delete = (req, res) => {
    UserClass.remove(req.params.codes, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with email ${req.params.UserEmail}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete user with email " + req.params.UserEmail
                });
            }
        } else res.status(200).send({ message: true });
    });
};

function isValid(req, res) {
    return true;
    

}