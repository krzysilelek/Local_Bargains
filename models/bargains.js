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
    }
  },
  title: {
    field: 'bargain_title',
    type: Sequelize.STRING(50),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  picture: {
    type: Sequelize.BLOB
  },
  tag: {
    type: Sequelize.ENUM,
    values: ['one', 'two'],
    allowNull: false
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
