var mongoose = require("mongoose");

var membersSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    upload_status: {
        type: String,
        required: true,
        default:"false"
    },
    date_created: {
        type: String,
        default: Date(Date.now())
    }
})
var members = mongoose.model("members",membersSchema);
module.exports = members;

