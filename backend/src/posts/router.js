const express = require("express");
const Post = require("./model");
const { withAuth } = require("../middlewares");

const router = express.Router();

// GET /posts - Fetch all visible posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ visible: true })
      .populate("authorId", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /posts/:id - Fetch a specific post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "authorId",
      "firstName lastName email"
    );

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// POST /posts - Create a new post (requires authentication)
router.post("/", withAuth, async (req, res) => {
  try {
    const { title, content, visible = true } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "Title and content are required",
      });
    }

    const post = new Post({
      authorId: req.userId,
      title: title.trim(),
      content: content.trim(),
      visible,
    });

    await post.save();

    // Populate the author info before sending response
    await post.populate("authorId", "firstName lastName email");

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PUT /posts/:id - Update a post (requires authentication and ownership)
router.put("/:id", withAuth, async (req, res) => {
  try {
    const { title, content, visible } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user owns this post
    if (post.authorId.toString() !== req.userId) {
      return res.status(403).json({
        error: "You can only update your own posts",
      });
    }

    // Update fields if provided
    if (title !== undefined) post.title = title.trim();
    if (content !== undefined) post.content = content.trim();
    if (visible !== undefined) post.visible = visible;

    await post.save();
    await post.populate("authorId", "firstName lastName email");

    res.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE /posts/:id - Delete a post (requires authentication and ownership)
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user owns this post
    if (post.authorId.toString() !== req.userId) {
      return res.status(403).json({
        error: "You can only delete your own posts",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

// GET /posts/user/:userId - Get posts by a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({
      authorId: req.params.userId,
      visible: true,
    })
      .populate("authorId", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
});

module.exports = router;
