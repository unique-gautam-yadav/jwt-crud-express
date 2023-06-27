const mongo = require('mongoose')

const s = mongo.Schema(({
    productId: String,
    productName: String,
    expiryDate: String,
    quantity: Number,
}))


const model = mongo.model('Products', s);


module.exports = model;