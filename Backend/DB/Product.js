const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    content: String, 
    timestampField: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('products', productSchema);
