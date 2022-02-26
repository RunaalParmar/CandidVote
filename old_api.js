const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,

} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");

const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'testing_database',
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err => err ? console.log(err) : console.log('Connected to database'));

app.use(express.json()); // used to parse the json body
const userModel = require('./models/users')
// app.get("/" , (req,res)=>{
//     res.send("<h2> Welcome to the students DB</h2>");
// });

// app.post("/createUser" , async (req,res)=>{
//     // const user = req.body;
//     // console.log(req);
//     // const newUser = new userModel({
//     //     "name": req.body.name,
//     //     "age": req.body.age,
//     //     "email": req.body.email
//     // });
//     // await newUser.save();
//     // res.json(user);
//     res.statusCode(200);

// })
// app.get("/getUsers" , (req, res)=>{
//     userModel.find({} , (err, result)=>{
//         if(err){
//             console.log(err);
//             res.send(err);
//         }
//         else{
//             res.json(result);

//         }
//     });

// })

app.post("/sample", (req,res)=>{
    res.statusCode(200);
})
// app.listen(3000,()=>{
//     console.log("listening in port 3000")
// });

module.exports.app = app;