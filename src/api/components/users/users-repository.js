const { Users } = require('../../../models');

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

async function createUser(email, password, fullName, role) {
  return Users.create({ email, password, fullName, role });
}

async function updateUser(id, email, fullName) {
  return Users.updateOne({ _id: id }, { $set: { email, fullName } });
}

async function updateRole(id, role) {
  return Users.updateOne({ _id: id }, { $set: { role } });
}

async function changePassword(id, password) {
  return Users.updateOne({ _id: id }, { $set: { password } });
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
  updateUser,
  changePassword,
  deleteUser,
  updateRole
};