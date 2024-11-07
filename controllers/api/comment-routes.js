const router = require('express').Router();
const { Comment } = require('../../models'); // Adjust the path as necessary
const withAuth = require('../../utils/auth'); // Middleware to check if the user is logged in

// Route to post a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, // Assuming you store the user ID in the session
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;