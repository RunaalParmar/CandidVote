const express = require('express');
const { model } = require('mongoose');
const passport = require('passport');
const {genPassword} = require('../lib/passwordUtils');
const {User} = require('../models/users');
const {isAuth, isAdmin, isSuperAdmin} = require('./authMiddleware');
const {v4: uuidv4} = require('uuid');

const router = express.Router();

// ENDPOINTS

/*router.get('/', async (req, res) => {
    let email = req.query.email; 
    let users = null;

    try {
        users = await User.find({email})
    } catch(e) {
        console.log(e);
    }
    
    if (users.length > 0){
        console.log(users);
        console.log("verified user");
        res.send(`Verified, welcome ${users[0].name}`);
    } else {
        console.log("user does not exist in database");
        res.send(`Not Verified`);
    }
})*/

router.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success',
})); // TODO: change redirects.

/*
router.post('/signIn', async (req, res) => { 
    let currUser;
    console.log(req.body);

    currUser = await User.findOne({email: req.body.email})
    console.log(currUser);

    if (currUser){
        if(req.body.password === currUser.password) { // TODO: Change this to proper validation
            console.log("verified user");
            res.send(currUser);
        } else {
            console.log("not verified");
            res.send({message: `username and password do not match`});
        }

    } else {
        console.log("user does not exist in database");
        res.send({message: `Not Verified`});
    }
})*/

router.post('/signUp', (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const uid = uuidv4();

    // Check if email already registered.
    User.findOne({email: req.body.email}).then((user) => {
        if (user) {
            // Email exists.
            res.status(403).send("email already exists");
        
        } else {
            // Create new user.
            const newUser = new User({
                uid,
                email: req.body.email,
                orgName: req.body.orgName,
                hash, // TODO
                salt, // TODO
                authLevel: "admin" // TODO
            });

            newUser.save()
                .then((user) => {
                    console.log(user);
                    next();
                });
        }
    })
    //res.send({msg: 'sign up success'})
    // res.redirect('/login'); // TODO
}, passport.authenticate('local', {failureRedirect: 'login-failure', successRedirect: 'login-success'}));

/*
router.post('/signUp', async (req, res) => {
    console.log(req.body);

    let newUser = new User(req.body);
    await newUser.save();
    const currUser = await User.findOne({email: req.body.email});
    
    if(currUser) {
        res.send(newUser);
    } else {
        res.send("error");
    }
})*/

module.exports = router;