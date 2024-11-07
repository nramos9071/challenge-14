const router = require('express').Router();
const withAuth = require('../../utils/auth'); // Adjust the path as necessary

// Route to render the homepage
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

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;