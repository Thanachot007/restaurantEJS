var mongoose = require("mongoose")

var seatingModel = mongoose.Schema({
    seatNumber: {
        type: String,
        required: true
    },
    bookingName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "booked",
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date_booking: {
        type: String,
        default: Date(Date.now())

    }
})
var seats = mongoose.model("seats", seatingModel);
module.exports = seats;