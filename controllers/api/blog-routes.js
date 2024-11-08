const router = require('express').Router();

const Blog = require('../../models/blog');
const Comment = require('../../models/comment');

const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
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
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['author', 'content', 'date_created'],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blogpage', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;