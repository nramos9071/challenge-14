const router = require('express').Router();
const withAuth = require('../../utils/auth'); // Adjust the path as necessary

router.get('/', withAuth, async (req, res) => {
  try {
    // Your existing code to fetch and render data
    res.render('homepage', {
      // Your data here
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;