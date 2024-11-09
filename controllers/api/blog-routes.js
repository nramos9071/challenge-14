const router = require('express').Router();

const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const withAuth = require('../../utils/auth');
const commentRoutes = require('./comment-routes');

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

router.use('/:blogId/comments', commentRoutes);

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date_created: new Date(),
    });

    res.status(200).json(newBlog);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(400).json({ message: 'Failed to create blog post', error: err.message });
  }
});

module.exports = router;