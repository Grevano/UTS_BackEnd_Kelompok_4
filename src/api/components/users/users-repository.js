const { Users } = require('../../../models');
const { emailExists } = require('./users-service');

async function getUsers(offset, limit) {
  return Users.find().skip(offset).limit(limit);
}

async function getAdminUsers(offset, limit) {
  return Users.find({ role: 'admin' }).skip(offset).limit(limit);
}


async function getUser(id) {
  return Users.findById(id);
}

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(email, password, fullName, role, lastSession) {
  return Users.create({ email, password, fullName, role, lastSession });
}

async function updateRole(id, role) {
  return Users.updateOne({ _id: id }, { $set: { role } });
}

async function updateUserSession(id) {
  return Users.updateOne({ _id: id }, { $set: { lastSession: Date.now()}});
}
async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getAdminUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUserSession,
  deleteUser,
  updateRole
};