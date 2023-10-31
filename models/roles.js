const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('roles', {
  id: {
    field: 'role_id',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_name: {
    type: Sequelize.STRING(20)
  }
});
