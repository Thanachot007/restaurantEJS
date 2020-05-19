var express = require('express')
var route = express.Router()
var history = require('../models/historyModel')
route.get('/', (req, res, next) => { 
    history.findOne({ email: req.session.emailSession }, (err, data) => { 
        if (err) console.log(err)
        console.log(data)

        res.render("history", {history:data})
    })
})
route.post('/uploadImage', (req, res, next) => { 
    let imgName = req.files.profile_img.name;
    imgName = imgName.toString()
    console.log("body  : "+imgName)
    let fileName = req.files.profile_img
    // var img_profile = new imgProfile({ email: req.session.emailSession, profile_img: imgName })
    history.findOneAndUpdate({email:req.session.emailSession}, {profile_images:imgName},(err, data) => { 
        if (err) console.log(err);
        // C:\Users\Thanachot\Desktop\nodeJS_ejs\server\public/images/profile_images
        fileName.mv("./public/images/profile_images/" + imgName, (err) => {
            if (err) console.log(err)
            res.redirect('/history')
            
        })
    })
    
})
module.exports = route;