const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// to get all post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// to get specific post
router.get("/:id", async (req, res) => {
  try {
    const getPost = await Post.findById(req.params.id);
    res.json(getPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// to submit post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const postData = await post.save();
    res.json(postData);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update a post
router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description
        },
      }
    );
    console.log("updatedPost", updatedPost)
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete specific post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.id });
    req.json(deletedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
