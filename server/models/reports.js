const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('reports', {
  id: {
    field: 'report_id',
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  bargain_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'bargains',
      key: 'bargain_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"

  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
