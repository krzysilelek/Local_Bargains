const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize.js');

module.exports = sequelize.define('tags', {
  id: {
    field: 'tag_id',
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  tag_name: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
});
