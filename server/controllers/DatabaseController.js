const sequelize = require('../database/sequelize.js');
const Users = require('../models/users.js');
const UserRole = require('../models/user_roles.js');
const Bargains = require('../models/bargains.js');
const bcrypt = require('bcrypt');

const paginate = (query, { page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    query,
    offset,
    limit,
  };
};

exports.test = async (req, res, next) => {
  Users.findAll().then((users) => {
    res.send(users);
  });
};

exports.getBargains = async (req, res, next) => {
  const bargains = await Bargains.findAll(
    paginate(
      {
        where: {},
      },
      { page: req.params.page, pageSize: req.params.pageSize }
    )
  );

  res.send(bargains)
}


exports.getPassword = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email
    }
  });
  if (user === null) return res.sendStatus(418);
  req.user = user;
  next();
}

exports.checkRole = async (req, res, next) => {
  const role = await UserRole.findOne({
    where: {
      user_id: req.user.id
    }
  });
  if (role === null) return res.status(400).send("User is roleless!");
  req.user_rol = role;
  next();
}

exports.addNewUser = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  password = await bcrypt.hash(password, 10);
  await Users.create({ username: username, password: password, email: email });
  res.send("User has been created!");
}
