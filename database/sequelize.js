const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  },
  define: {
    timestamps: false,
  }
});

module.exports = sequelize;
