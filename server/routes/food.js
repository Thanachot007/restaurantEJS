var express = require("express");
var route = express.Router();
var food = require('../models/foodModel');
var bill = require('../models/billsModel')
route.get('/', (req, res, next) => {
    food.find().exec((err, data) => {
        if (err) console.log(err);
        // console.log(typeof(data))
        // console.log(Object.keys(data))
        // console.log(data[0].foodName)
        res.render("listoffood", {
            foodData: data
        })
    })

})
route.post('/uploadfood', (req, res, next) => {
    var img_name = req.files.food_img.name;
    console.log(req.body)
    img_name = img_name.toString()
    console.log(img_name)
    let fileName = req.files.food_img
    var foodDoc = new food({
        foodName: req.body.foodName,
        price: req.body.price,
        desc: req.body.desc,
        img: img_name
    })
    foodDoc.save((err, data) => {
        if (err) console.log(err)
        fileName.mv("./public/images/foods/" + img_name, (err) => {
            if (err) console.log(err)
            res.redirect('/food')
            console.log(data)
        })

    })
})
route.get('/editform/:_id', (req, res, next) => {
    console.log('editform')

    food.findById(req.params._id, (err, data) => {
        console.log(typeof(data))
        console.log(Object.keys(data))
        if (err) console.log(err);
        res.render('listoffood', {
                data_edit: data,
                status: "edit"
            })
            // console.log(data)
    })
})
route.post('/updated', (req, res, next) => {
    console.log(req.body.foodName)
    food.findByIdAndUpdate({
        _id: req.body.food_id
    }, {
        foodName: req.body.foodName,
        price: req.body.price,
        desc: req.body.desc,
        img: req.body.img
    }, (err, data) => {
        if (err) console.log(err);
        console.log(data)
        res.redirect('/food')
    })
})
route.post('/updateFoodImage', (req, res, next) => {
    var img_name = req.files.img_update.name;
    console.log(req.body)
    img_name = img_name.toString()
    console.log(img_name)
    let fileName = req.files.img_update
    food.findByIdAndUpdate(req.body.food_id, {
        img: img_name
    }, (err, data) => {
        if (err) console.log(err)
        fileName.mv("./public/images/foods/" + img_name, (err) => {
            if (err) console.log(err)
            res.redirect('/food')
            console.log(data)
        })
    })
})
route.get('/deletefood/:_id', (req, res, next) => {
    food.findByIdAndRemove(req.params._id, (err, data) => {
        if (err) console.log(err)
        console.log("delete finished")
        res.redirect('/food')
    })
})
route.get("/buy/:foodName", (req, res, next) => {
    food.findOne({
        foodName: req.params.foodName
    }, (err, data) => {
        if (err) console.log(data)
        console.log(data)
        res.render("listoffood", {
            status: "buy",
            buyData: data
        })
    })
})

route.post("/bought", (req, res, next) => {
    let foodName = req.body.foodName
    let amount = req.body.amount
    const totalPrice = req.body.total
        // const = req.body.
    let addInFood = ""
    if (req.body.addIng) {
        addInFood = req.body.addIng.toString()
    } else {
        addInFood = "not have"
    }

    var billDoc = new bill({ foodName: foodName, amount: amount, addInFood: addInFood, price: totalPrice })
    billDoc.save((err, data) => {
        if (err) console.log(err);
        console.log(data)
            // res.redirect('/food') //เดี๋ยวเปลี่ยนไปหน้า success แทน และมีกลับไปที่ food
        res.render('bill', { data_bill: data })
    })
})
module.exports = route;