const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('comments', {
  id: {
    field: 'comment_id',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bargain_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'bargains',
      key: 'bargain_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  date: {
    type: Sequelize.DATE
  }
});
