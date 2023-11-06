const sequelize = require('../database/sequelize.js');
const Users = require('../models/users.js');
const Roles = require('../models/roles.js');
const UserRole = require('../models/user_roles.js');
require('../models/bargains.js');
require('../models/comments.js');
require('../models/reports.js');

async function build() {
  await sequelize.sync({ force: true });
  await Users.create({ username: 'walidator03', password: '$2b$10$KIODl6YVXpq4QDWxou7rBusYT9/bwJu6F8N2CajsuAFVxaIgKnjTS', email: 'walidator03@gmail.com' });
  await Users.create({ username: 'userek', password: '$2y$10$zU1AFbOgYC7s9daDIbcZN.AwiwhkZ388ZHmqz2vgj1IDN6fSdQh8K', email: 'user@user.com' });
  await Roles.create({ role_name: 'Administrator' });
  await Roles.create({ role_name: 'User' });
  await UserRole.create({ user_id: 1, role_id: 1 });
  await UserRole.create({ user_id: 2, role_id: 2 });
}

build();
console.log("All models were synchronized successfully.");
