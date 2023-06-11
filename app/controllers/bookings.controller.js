const BookingClass = require("../models/bookings.model");

// Create and save a new booking
exports.create = (req, res) => {
    // Create a booking
    const booking = new BookingClass({
        CheckInDate: req.body.CheckInDate,
        CheckOutDate: req.body.CheckOutDate,
        BookingStatus: req.body.BookingStatus,
        BookingBills: req.body.BookingBills,
        PaymentStatus: req.body.PaymentStatus,
    });

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
};
/*
// Retrieve all bookings from the database (with condition)
exports.findBooking = (req, res) => {
    console.dir(req.body.params);

    BookingClass.findLoginBooking(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving bookings.",
            });
        } else {
            res.status(200).send(data);
        }
    });
};
*/
// Retrieve all bookings from the database (with condition)
exports.findBooking = (req, res) => {
  console.dir(req.body.params);

  BookingClass.getAll(req.query.sortBy, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving bookings.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// Find a single booking by ID
exports.findOne = (req, res) => {
    console.dir(req.body.params);
    BookingClass.findById(req.params.bookingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found booking with ID ${ req.params.bookingId }.,`
    });
} else {
    res.status(500).send({
        message: `Error retrieving booking with ID ${ req.params.bookingId }.,`
    });
    }
    } else {
    res.status(200).send(data);
}
    });
    };

// Update a booking by ID
exports.update = (req, res) => {
    if (isValid(req, res)) {
        BookingClass.updateById(
            req.params.bookingId,
            new BookingClass(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found booking with ID ${ req.params.bookingId }.,`
    });
    } else {
        res.status(500).send({
            message: "Error updating booking with ID " + req.params.bookingId,
        });
    }
} else {
    res.status(200).send(data);
}
    }
    );
    }
    };

// Delete a booking by ID
exports.delete = (req, res) => {
    BookingClass.remove(req.params.bookingId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found booking with ID ${ req.params.bookingId }.,`
    });
} else {
    res.status(500).send({
        message: "Could not delete booking with ID " + req.params.bookingId,
    });
}
    } else {
    res.status(200).send({ message: true });
}
    });
    };

function isValid(req, res) {
    return true;
}