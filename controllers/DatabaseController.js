const sequelize = require('../database/sequelize.js');
const Users = require('../models/users.js');

exports.test = async (req, res, next) => {
  Users.findAll().then((users) => {
    req.dbquery = users;
    next();
  });
};

exports.getPassword = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user === null) {
    return res.status(400).send("User not exist!");
  }
  req.user = user;
  next();
}

