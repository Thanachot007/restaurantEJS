var mongoose = require('mongoose');
var historySchema = mongoose.Schema({
    email: {
        type: String,
        lowercase:true,
        required:true
    },
    color: {
        type: String,
        lowercase: true,
        required:true
    },
    food: {
        type: String,
        lowercase: true,
        required:true
    },
    sport: {
        type: String,
        lowercase: true,
        required:true
    },
    faculty: {
        type: String,
        lowercase: true,
        required:true
    },
    department: {
        type: String,
        lowercase: true,
        required:true
    },
    profile_images: {
        type: String,
        required: true,
        default:"null"
    },
    date_created: {
        type: String,
        default:Date(Date.now())
    }

})

var history = mongoose.model("histories", historySchema);
module.exports = history;
