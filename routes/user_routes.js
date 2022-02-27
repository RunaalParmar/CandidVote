const express = require("express");
const Post = require("../models/users");
const router = express.Router();

router.get("/getusers", async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

router.post("/createUser", async (req, res) => {
  const post = new Post({
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

router.get("/getUsers/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.patch("/patchUser/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

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
    await Post.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = router;