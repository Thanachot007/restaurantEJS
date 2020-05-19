var mongoose = require("mongoose")

var profileImageSchema = mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    profile_img: {
        type: String,
        required:true
    },
    date_upload: {
        type: String,
        required: true,
        default:Date(Date.now())
    }
})
var imgProfile = mongoose.model("profile_images", profileImageSchema)
module.exports = imgProfile;