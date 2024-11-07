const router = require('express').Router();

const homeRoutes = require('./api/home-routes');
const userRoutes = require('./api/user-routes');
const blogRoutes = require('./api/blog-routes');
const commentRoutes = require('./api/comment-routes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);









module.exports = router;