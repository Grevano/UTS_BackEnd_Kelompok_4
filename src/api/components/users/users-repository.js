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

async function createUser(email, password, fullName, role, lastSession) {
  return Users.create({ email, password, fullName, role, lastSession});
  
}

async function updateUserSession(id) {
  return Users.updateOne({ _id: id }, { lastSession: Date.now() })
}

//for testing purposes
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
};
