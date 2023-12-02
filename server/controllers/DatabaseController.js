const sequelize = require('../database/sequelize.js');
const Users = require('../models/users.js');
const UserRole = require('../models/user_roles.js');
const Bargains = require('../models/bargains.js');
const Comments = require('../models/comments.js');
const Reports = require('../models/reports.js');
const Tags = require('../models/tags.js');

const bcrypt = require('bcrypt');

const paginate = (query, { page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    ...query,
    offset,
    limit,
  };
};

exports.test = async (req, res, next) => {
  Users.findAll().then((users) => {
    res.send(users);
  });
};

exports.getBargainsPaginate = async (req, res, next) => {
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const bargains = await Bargains.findAll(
    paginate(
      {
        where: {},
        include: [{
          association: Tag,
          attributes: ["tag_name"]
        }]
      },
      { page: req.params.page, pageSize: req.params.pageSize }
    )
  );

  res.send(bargains)
}

exports.getBargainsOfUser = async (req, res) => {
  const { payload } = req.user;
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const bargains = await Bargains.findAll({
    where: {
      user_id: payload
    },
    include: [{
      association: Tag,
      attributes: ["tag_name"]
    }]

  });
  res.send(bargains);
}

exports.getBargains = async (req, res) => {
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const bargains = await Bargains.findAll({
    include: [{
      association: Tag,
      attributes: ["tag_name"]
    }]
  });
  res.send(bargains)
}

exports.getBargain = async (req, res) => {
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const bargain = await Bargains.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      association: Tag,
      attributes: ["tag_name"]
    }]
  });
  if (bargain === null) return res.status(400).send("There is no bargain with that ID!");
  res.send(bargain);
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
  try {
    await Users.create({ username: username, password: password, email: email });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send("Email is already used!");
    }
    next(err);
  }
  res.send("User has been created!");
}

exports.listAllComments = async (req, res) => {
  const User = Comments.belongsTo(Users, { foreignKey: "user_id" });
  const comments = await Comments.findAll({
    where: {
      bargain_id: req.params.bargain_id
    },
    include: [{
      association: User,
      attributes: ["username"]
    }]
  });
  if (comments === null) return res.status(400).send("No comments!");
  res.send(comments);
}

exports.addNewComment = async (req, res) => {
  const bargain_id = req.body.bargain_id;
  const user_id = req.user.payload;
  const description = req.body.comment;

  try {
    await Comments.create({ bargain_id: bargain_id, user_id: user_id, description: description });
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
  res.send("Comment has been added!");
}

exports.addNewReport = async (req, res) => {
  const bargain_id = req.body.bargain_id;
  const user_id = req.user.payload;
  const description = req.body.report;

  try {
    await Reports.create({ bargain_id: bargain_id, user_id: user_id, description: description });
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
  res.send("Report has been added!");
}

exports.getTags = async (req, res) => {
  const tags = await Tags.findAll();
  res.send(tags);
}

