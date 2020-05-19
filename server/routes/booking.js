var express = require("express")
var route = express.Router()
var booking = require("../models/seatingModel")
route.get("/", (req, res, next) => {
    booking.find().exec((err, data) => {
        if (err) console.log(err)
        res.render("reserveTable", { bookingData: data })
    })

})
route.post("/booked", (req, res, next) => {
    var bookingData = new booking(req.body)
    bookingData.save((err, data) => {
        if (err) console.log(err)
        console.log(data.status)
        res.redirect("/booking")
    })
})
module.exports = route