var express = require('express');
var router = express.Router();
var csurf = require("csurf")
var csrfProtection = csurf({ cookie: true })
/* GET home page. */
router.get('/',csrfProtection,function(req, res, next) {
  res.render('index', { csrfToken: req.csrfToken() });

});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

module.exports = router;
