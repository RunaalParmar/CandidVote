//basic schema definition for a collection in the database

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ // this is the schema object where we kind of define all the attributes and their propreties
    firstname: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required:true,
    },
    address: {
        type: String,
        
    },
    zip: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
    }
});

//This is the model that connects the collection and the schema. If we have not already created the collection, this will create one for you.
const userModel = mongoose.model("users" , userSchema)

module.exports = userModel;