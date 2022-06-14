const User = require('./User');
const WatchList = require('./WatchList');
const Shows = require('./Shows');

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

module.exports = { User, WatchList, Shows };
