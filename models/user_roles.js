const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('user_roles', {
  user_id: {
    type: Sequelize.UUID,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'user_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    }
  },
  role_id: {
    type: Sequelize.UUID,
    references: {
      model: 'roles',
      key: 'role_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    }
  }
});
