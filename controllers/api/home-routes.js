const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth'); 

// Route to render the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['author', 'content', 'date_created'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id, // Pass the user ID to the template
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

router.get('/register', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('registerpage'); // Ensure this matches the name of your register view
});

module.exports = router;