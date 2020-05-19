var express = require('express')
var route = express.Router();
// var members = require('../models/membersModel')

route.get("/", (req, res, next) => { 

    res.render('page1')
})

module.exports = route;