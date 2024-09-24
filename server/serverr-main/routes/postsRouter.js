const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/', async (req, res) => {
  const post = new Post(req.body);
  try {
      const newPost = await post.save();
      res.status(201).json(newPost);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});
// Get all posts.
router.get('/', async (req, res) => {
  try {
      const posts = await Post.find();
      res.json(posts);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Read one post
router.get('/:id', getPost, (req, res) => {
    res.json(res.post);
});

// Update a post
router.put('/:id', async (req, res) => {
    console.log("In updatee")
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) res.status(404).json({ message: 'Post not found' });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a post
router.delete('/:id', getPost, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) res.status(404).json({ message: 'Post not found' });
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get post object by ID
async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.post = post;
    next();
}

module.exports = router;




