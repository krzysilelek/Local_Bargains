const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('user_roles', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    }
  },
  role_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'roles',
      key: 'id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    }
  }
});
