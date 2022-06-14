const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shows extends Model {}

Shows.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    shows_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // ##############################
    // post_id will need to be changed to watch_list* etc
    watchlist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'watchlist',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'shows',
  }
);

module.exports = Shows;
