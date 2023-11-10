const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('users', {
  id: {
    field: 'user_id',
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  avatar: {
    type: Sequelize.BLOB
  }
});
