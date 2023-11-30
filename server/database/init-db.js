const sequelize = require('./sequelize.js');
const Users = require('../models/users.js');
const Roles = require('../models/roles.js');
const UserRole = require('../models/user_roles.js');
const Bargains = require('../models/bargains.js');
require('../models/comments.js');
require('../models/reports.js');
const Tags = require('../models/tags.js');

async function findUserUUID(_username) {
  const { id } = await Users.findOne({
    where: {
      username: _username
    }
  });
  return id;
}

async function findRoleUUID(roleName) {
  const { id } = await Roles.findOne({
    where: {
      role_name: roleName
    }
  });
  return id;
}

async function findTagUUID(tagName) {
  const { id } = await Tags.findOne({
    where: {
      tag_name: tagName
    }
  });
  return id;
}


async function build() {
  await sequelize.sync({ force: true });
  await Users.create({ username: 'walidator03', password: '$2b$10$KIODl6YVXpq4QDWxou7rBusYT9/bwJu6F8N2CajsuAFVxaIgKnjTS', email: 'walidator03@gmail.com' });
  await Users.create({ username: 'userek', password: '$2y$10$zU1AFbOgYC7s9daDIbcZN.AwiwhkZ388ZHmqz2vgj1IDN6fSdQh8K', email: 'user@user.com' });
  await Roles.create({ role_name: 'Administrator' });
  await Roles.create({ role_name: 'User' });
  await UserRole.create({ user_id: await findUserUUID('walidator03'), role_id: await findRoleUUID('Administrator') });
  await UserRole.create({ user_id: await findUserUUID('userek'), role_id: await findRoleUUID('User') });
  await Tags.create({ tag_name: 'ONE' });
  await Tags.create({ tag_name: 'TWO' });
  await Bargains.create({ user_id: await findUserUUID('userek'), title: 'TEST BARGAIN 1', tag_id: await findTagUUID('ONE'), latitude: 50.12, longitude: 40.21 });
  await Bargains.create({ user_id: await findUserUUID('walidator03'), title: 'TEST BARGAIN 2', tag_id: await findTagUUID('TWO'), latitude: 50.12, longitude: 40.21 });
}

build();

console.log("All models were synchronized successfully.");
