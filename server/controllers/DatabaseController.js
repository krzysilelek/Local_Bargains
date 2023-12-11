const sequelize = require('../database/sequelize.js');
const { Op } = require('sequelize');
const Users = require('../models/users.js');
const UserRole = require('../models/user_roles.js');
const Bargains = require('../models/bargains.js');
const Comments = require('../models/comments.js');
const Reports = require('../models/reports.js');
const Tags = require('../models/tags.js');
const Roles = require('../models/roles.js');

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

exports.getUsers = async (req, res) => {

  const users = await Users.findAll({
    where: {
      id: { [Op.ne]: req.user.id }
    },
    attributes: ["id", "username", "active"],
    order: [
      ["username", "ASC"]
    ]
  });
  res.send(users);
};

exports.deleteUser = async (req, res) => {
  await Users.destroy({
    where: {
      id: req.body.userId
    },
  });
  res.send("User has been deleted!");
};

exports.switchActive = async (req, res) => {
  const { userId } = req.body;
  const user = await Users.findOne({
    where: {
      id: userId
    }
  });

  user.active = !user.active;
  await user.save();
  res.send("Active status has been changed!");
}

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
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const bargains = await Bargains.findAll({
    where: {
      user_id: req.user.id
    },
    attributes: ["id", "title", "description"],
    include: [{
      association: Tag,
      attributes: ["tag_name"]
    }]

  });
  res.send(bargains);
}

exports.getLocalBargains = async (req, res) => {
  const { client_lat, client_lon, radius, tags } = req.params;
  const splittedTags = tags.split(",");
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const haversineFormula = `(6371 * acos(cos(radians(${client_lat})) * cos(radians(latitude)) * cos(radians(${client_lon}) - radians(longitude)) + sin(radians(${client_lat})) * sin(radians(latitude))))`;
  const bargains = await Bargains.findAll({
    attributes: ["id", "title", "description"],
    include: [{
      association: Tag,
      attributes: ["tag_name"],
      where: {
        tag_name: splittedTags
      }
    }],
    where: sequelize.literal(`${haversineFormula} < ${radius}`)
  });
  res.send(bargains);
}

exports.getBargains = async (req, res) => {
  const Tag = Bargains.belongsTo(Tags, { foreignKey: "tag_id" });
  const bargains = await Bargains.findAll({
    attributes: ["id", "title", "description"],
    include: [{
      association: Tag,
      attributes: ["tag_name"]
    }]
  });
  res.send(bargains);
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

exports.addNewBargain = async (req, res) => {
  const { id } = req.user
  const { title, description, base64Photo: picture = "", tag, latitude, longitude } = req.body;

  await Bargains.create({ user_id: id, title: title, description: description, picture: picture, tag_id: tag, latitude: latitude, longitude: longitude });
  res.send("Bargain has been created!");
}

exports.editBargain = async (req, res) => {

  const {
    bargainId: id,
    title = "",
    description = "",
    base64Photo: picture = "",
    tag = "",
    latitude = "",
    longitude = "",
  } = req.body;

  const updateFields = {};
  if (title !== "") updateFields.title = title;
  if (description !== "") updateFields.description = description;
  if (picture !== "") updateFields.picture = picture;
  if (tag !== "") updateFields.tag_id = tag;
  if (latitude !== "") updateFields.latitude = latitude;
  if (longitude !== "") updateFields.longitude = longitude;

  const updateQuery = `UPDATE bargains SET ${Object.keys(updateFields).map(key => `${key} = :${key}`).join(', ')} WHERE bargain_id = :id`;

  await sequelize.query(updateQuery, {
    replacements: { ...updateFields, id },
    type: sequelize.QueryTypes.UPDATE,
  });

  res.send("Bargain has been updated!");
}

exports.deleteBargain = async (req, res) => {
  const id = req.body.bargainId;
  await Bargains.destroy({
    where: {
      id: id
    },
  });
  res.send("Bargain has been deleted!");
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

exports.checkActiveStatus = async (req, res, next) => {
  const user = await Users.findOne({
    where: {
      id: req.user.id
    }
  });
  if (user === null) return res.sendStatus(418);
  if (user.active !== true) return res.sendStatus(403);
  next();
}


exports.checkRole = async (req, res, next) => {
  const role = await UserRole.findOne({
    where: {
      user_id: req.user.id
    }
  });
  if (role === null) return res.status(400).send("User is roleless!");
  req.user_role = role;
  next();
}

exports.checkIfAdmin = async (req, res, next) => {
  const role = await Roles.findOne({
    where: {
      id: req.user.roleId
    }
  });
  if (role.role_name !== "Administrator") {
    return res.status(400).send("Users is not an Administrator!");
  }
  next();
}

exports.getRoleName = async (req, res, next) => {
  const role = await Roles.findOne({
    where: {
      id: req.user_role.role_id
    }
  });
  if (role === null) return res.status(400).send("No role with that UUID!");
  req.role_name = role.role_name;
  next();
}
exports.addNewUser = async (req, res, next) => {
  const { username, email } = req.body;
  let { password } = req.body;
  password = await bcrypt.hash(password, 10);
  try {
    const user = await Users.create({ username: username, password: password, email: email });
    const role = await Roles.findOne({
      where: {
        role_name: "User"
      }
    });
    await UserRole.create({ user_id: user.id, role_id: role.id });

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
    }],
    order: [
      ["date", "DESC"]
    ]
  });
  if (comments === null) return res.status(400).send("No comments!");
  res.send(comments);
}

exports.addNewComment = async (req, res) => {
  const {
    bargain_id, comment: description, rate
  } = req.body;
  const { id: user_id } = req.user;

  try {
    await Comments.create({ bargain_id: bargain_id, user_id: user_id, description: description, rate: rate });
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
  res.send("Comment has been added!");
}

exports.addNewReport = async (req, res) => {
  const { bargain_id, report: description } = req.body;
  const { user_id } = req.user;
  try {
    await Reports.create({ bargain_id: bargain_id, user_id: user_id, description: description });
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
  res.send("Report has been added!");
}

exports.getTags = async (req, res) => {
  const tags = await Tags.findAll({
    order: [
      ["tag_name", "ASC"]
    ]
  });
  res.send(tags);
}

exports.addNewTag = async (req, res) => {
  const { name } = req.body;
  try {
    await Tags.create({ tag_name: name });
  } catch (err) {
    return res.status(400).send("Something went wrong!");
  }
  res.send("Tag has been added!");
}

exports.editTag = async (req, res) => {
  const { tagId, name } = req.body;

  try {
    await Tags.update({ tag_name: name }, {
      where: {
        id: tagId,
      },
    });
  } catch (err) {
    return res.send("Something went wrong!");
  }
  res.send("OK");
}

exports.deleteTag = async (req, res) => {
  const id = req.body.tagId;
  await Tags.destroy({
    where: {
      id: id
    },
  });
  res.send("Tag has been deleted!");
}

