const User = require('./User');
const Post = require('./Post');
const Reviews = require('./Reviews');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.belongsToMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsToMany(User, {
  foreignKey: 'post_id',
});

Reviews.belongsTo(User, {
  foreignKey: 'user_id',
});

Reviews.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Reviews, {
  foreignKey: 'user_id',
});

Post.hasMany(Reviews, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Reviews };
