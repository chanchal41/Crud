const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    longDescription:String,
    attributes:String,
    price:Number,
    salePrice:Number,
    stock:String,
    image:String,
    tax:Number
});
module.exports = mongoose.model('categories', productSchema)