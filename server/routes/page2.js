var express = require('express');
var route = express.Router();
var history = require('../models/historyModel')
var member = require('../models/membersModel')
route.get('/', (req, res, next) => {
    res.render("page2")
})
route.post('/savehistory', (req, res, next) => {
    var historyData = new history(req.body)
    historyData.save((err, data) => {
        if (err) console.log(err);
        console.log(data);
        member.findOneAndUpdate({email:req.session.emailSession}, {upload_status:"true"}, (err,data) => { 
            res.redirect('/history')
        })

    })
})

module.exports = route;