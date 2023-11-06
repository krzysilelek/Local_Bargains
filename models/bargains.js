const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('bargains', {
  id: {
    field: 'bargain_id',
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'user_id',
      deferrable: Sequelize.INITIALLY_IMMEDIATE
    }
  },
  title: {
    field: 'bargain_title',
    type: Sequelize.STRING(50)
  },
  description: {
    type: Sequelize.TEXT
  },
  picture: {
    type: Sequelize.BLOB
  },
  tag: {
    type: Sequelize.ENUM,
    values: ['one', 'two']
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  }
});
