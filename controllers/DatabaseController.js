const sequelize = require('../database/sequelize.js');
const Users = require('../models/users.js');

exports.test = async (req, res, next) => {
  console.log("In DB");
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
    throw new Error("User not exist!");
  }
  req.user = user;
  next();
}

