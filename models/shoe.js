const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ShoeSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: Number,
        required: true 
    },
    password : {
        type:String,
        required: true
    }
},{ timestamps : true})

const Shoe = mongoose.model("Shoe",ShoeSchema)
module.exports = Shoe