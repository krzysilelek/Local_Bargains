const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('users', {
  id: {
    field: 'user_id',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    field: 'username',
    type: Sequelize.STRING(20)
  },
  password: {
    type: Sequelize.STRING()
  },
  email: {
    type: Sequelize.STRING(50)
  }
});
