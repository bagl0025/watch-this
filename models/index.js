const User = require('./User');
const WatchList = require('./WatchList');
const Shows = require('./Shows');
const Reviews = require('./Reviews');

// create associations
User.hasMany(WatchList, {
  foreignKey: 'user_id',
});

WatchList.belongsTo(User, {
  foreignKey: 'user_id',
});

Shows.belongsTo(User, {
  foreignKey: 'user_id',
});

Shows.belongsTo(WatchList, {
  foreignKey: 'watchlist_id',
});

User.hasMany(Shows, {
  foreignKey: 'user_id',
});

WatchList.hasMany(Shows, {
  foreignKey: 'watchlist_id',
});

Reviews.belongsTo(User, {
  foreignKey: 'user_id',
});

Reviews.belongsTo(WatchList, {
  foreignKey: 'watchlist_id',
});

User.hasMany(Reviews, {
  foreignKey: 'user_id',
});

WatchList.hasMany(Reviews, {
  foreignKey: 'watchlist_id',
});

module.exports = { User, WatchList, Shows, Reviews };
