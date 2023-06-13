const BookingClass = require("../models/booking.model");



    // Save the booking in the database
BookingClass.create(booking, (err, data) => {
        console.log(err);
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the booking.",
            });
        } else {
            res.status(201).send(data);
        }
    });

