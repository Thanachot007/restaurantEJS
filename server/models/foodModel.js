var mongoose = require("mongoose")

var foodSchema = mongoose.Schema({
    foodName: {
        type: String,
        lowercase: true,
        required: true
    },
    price: {
        type: String,
        lowercase: true,
        required: true
    },
    desc: {
        type: String,
        lowercase: true,
        required: true
    },
    img: {
        type: String
    },
    date_upload: {
        type: String,
        lowercase: true,
        default: Date(Date.now())
    }
})

var food = mongoose.model("foods", foodSchema)
module.exports = food;