var express = require("express");
var route = express.Router();
var members = require("../models/membersModel");
var bcrypt = require("bcrypt");
var csurf = require("csurf")
var csrfProtection = csurf({ cookie: true })

route.get("/", (req, res, next) => {
    res.render("registration");
});
route.post("/savemember", (req, res, next) => {
    const {
        fname,
        lname,
        email,
        username,
        password,
        confirmpass,
    } = req.body;
    console.log(req.body);
    const salt = 10;
    let hashed
    members.findOne({
        email: email
    }, (err, data) => {
        if (data) {

            res.render("registration", {
                invalid: "member is exist"
            })

        }
        if (err) {
            console.log(err);   
        } else {
            if (password === confirmpass) {
                bcrypt.hash(password, salt, (err, result) => {
                    if (err) console.log(err)
                    else {
                        hashed = result
                        const memberData = new members({
                            fname,
                            lname,
                            email,
                            username,
                            password: hashed
                        });
                        memberData.save((err, data) => {
                            if (err) console.log(err)
                            console.log(data)
                            res.redirect("/")
                        })
                    }
                })
            }
            else { 
                res.render("registration", {invalid:"password and confirmpassword is not like"})
            }
            }
            
    })

})
route.post('/checklogin',csrfProtection, (req, res, next) => {
    console.log(req.body.username.toLowerCase())
    members.findOne({
        username: req.body.username.toLowerCase()
    }, (err, data) => {
        if (err) console.log(err)
        // console.log(data)
        if (data) {
            var isCorrect = bcrypt.compareSync(req.body.password, data.password);
            console.log("status : " + isCorrect)
            if (isCorrect) {
                // console.log(data)
                req.session.usernameSession = data.username
                req.session.emailSession = data.email
                req.session.statusUpload = data.upload_status
                var usernameSession = req.session.usernameSession
                // req.locals.usernameSession = data.username;
                res.render("page1")
                console.log(usernameSession)

            } else {
                res.render("index", {err:"invalid username and/or password",csrfToken: req.csrfToken()})
            }
        } else {
            res.render("index", {err:"invalid username and/or password",csrfToken: req.csrfToken()})
        }
    })
})
route.get('/logout', (req, res, next) => { 
    console.log("before : "+req.session.usernameSession)
    req.session.usernameSession = null;
    req.session.statusUpload = null;
    console.log("after : "+req.session.usernameSession)
    res.redirect("/")

})
module.exports = route;