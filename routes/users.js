const express = require('express');
const {model} = require('mongoose');
const passport = require('passport');
const {v4: uuidv4} = require('uuid');
const {genPassword} = require('../lib/passwordUtils');
const {isAuth, isAdmin, isSuperAdmin} = require('./authMiddleware');
const {User} = require('../models/users');
const router = express.Router();

router.get("/getusers", async (req, res) => {
  const posts = await User.find();
  res.send(posts);
});

router.get("/getUsers/:id", async (req, res) => {
  try {
    const post = await User.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.patch("/patchUser/:id", async (req, res) => {
  try {
    const post = await User.findOne({ _id: req.params.id });

    if (req.body.title) {
      post.title = req.body.title;
    }

    if (req.body.content) {
      post.content = req.body.content;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.post("/createUser", async (req, res) => {
  const post = new User({
    firstname:req.body.firstname,
    surname:req.body.surname,
    DOB:req.body.DOB,
    address:req.body.address,
    zip:req.body.zip,
    gender:req.body.gender,
    phoneNumber:req.body.phoneNumber
  });
  await post.save();
  res.send(post);
});

router.post('/signIn', passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/login-success',
})); // TODO: change redirects.


router.post('/signUp', (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const uid = uuidv4();

    // Check if email already registered.
    User.findOne({email: req.body.email}).then((user) => {
        if (user) {
            // Email exists.
            res.status(403).send({msg:"Email already exists!"});
        
        } else {
            // Create new user.
            const newUser = new User({
                uid,
                email: req.body.email,
                orgName: req.body.orgName,
                username: req.body.username,
                hash, // TODO
                salt, // TODO
                // authLevel: "admin"
            });

            newUser.save()
                .then((user) => {
                    console.log(user);
                    next();
                });
        }
    })
}, passport.authenticate('local', {failureRedirect: 'login-failure', successRedirect: '/registration/registration.html'}));

module.exports = router;