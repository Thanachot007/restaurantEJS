var mongoose = require('mongoose')

var billSchema = mongoose.Schema({
    foodName: { type: String, required: true },
    amount: { type: String, default: '1' },
    addInFood: { type: String },
    price: { type: String },
    date_ordered: { type: String, default: Date(Date.now()) }
})
var bill = mongoose.model("bills", billSchema);
module.exports = bill;