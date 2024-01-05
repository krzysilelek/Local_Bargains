const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('bargains', {
  id: {
    field: 'bargain_id',
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
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
  title: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  picture: {
    type: Sequelize.BLOB
  },
  tag_id: {
    type: Sequelize.UUID,
    references: {
      model: 'tags',
      key: 'tag_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE"
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});
