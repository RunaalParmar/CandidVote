// const express = require("express")
// const mongoose = require("mongoose")
// const createServer = require("./servers/user_server") 
// 
// mongoose
// 	.connect("mongodb://localhost:27017/CandidVote", { useNewUrlParser: true })
// 	.then(() => {
// 		const app = createServer() 
// 		app.listen(5000, () => {
// 			console.log("Server has started!")
// 		})
// 	})

const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

const port = 5000;

const localhost_addr = "http://localhost:";

const mongoURL = "mongodb+srv://r3parmar:CandidVoTePWD@candidvote.wxjmp.mongodb.net/CandidVoTeDB?retryWrites=true&w=majority";

// CONNECT TO DATABASE
async function connectToDB() {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected To DB"); 
    } catch(e) {
        console.log(e);
    }  
}

connectToDB();

// MIDDLEWARE
app.options("*", cors({ origin: localhost_addr + port, optionsSuccessStatus: 200 }));
app.use(cors({ origin: localhost_addr + port, optionsSuccessStatus: 200 }));

app.use('/', express.static('public'));
app.use(bodyParser.json());

app.use(session({
    secret: 'my secret, any string', // TODO: Change to rely on env var later.
    store: MongoStore.create({mongoUrl: mongoURL}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  // 1 day
    },
    resave: false,
    saveUninitialized: false
}));

// PASSPORT AUTH
const auth = require('./auth');
auth.initPassport(app);

// ROUTES
const users = require('./routes/users');
app.use('/users', users);

// SERVER LAUNCH
app.listen(port, () => {
  console.log(`CandidVoTe app listening on port ${port}`);
});