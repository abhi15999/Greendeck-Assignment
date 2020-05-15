//Schemas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String
}, { strict: false });
const Net = mongoose.model('Net', ProductSchema, 'netaporter');



module.exports =  Net ;