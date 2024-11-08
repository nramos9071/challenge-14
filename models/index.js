const User = require('./user');
const Blog = require('./blog');
const Comment = require('./comment');

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE',
  });
  
  Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
  });


module.exports = { User, Blog, Comment };