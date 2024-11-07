const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const blogRoutes = require('./api/blog-routes');
const commentRoutes = require('./api/comment-routes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);









module.exports = router;