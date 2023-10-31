const sequelize = require('../database/sequelize.js');
const Users = require('../models/users.js');
const UserRole = require('../models/user_roles.js');

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
  if (user === null) return res.status(400).send("User not exist!");
  req.user = user;
  next();
}

exports.checkRole = async (req, res, next) => {
  const role = await UserRole.findOne({
    where: {
      user_id: req.user.id
    }
  });
  if (role === null) return res.status(400).send("User is ruleless!");
  req.user_rol = role;
  next();
}

