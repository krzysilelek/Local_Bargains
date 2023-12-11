const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('comments', {
  id: {
    field: 'comment_id',
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
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  rate: {
    type: Sequelize.ENUM,
    values: ['Good', 'Bad'],
    allowNull: false
  }
});
