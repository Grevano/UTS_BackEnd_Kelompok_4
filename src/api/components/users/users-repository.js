const { Users } = require('../../../models');

async function getAdminUsers(offset, limit) {
  return Users.find({ role: 'admin' }).skip(offset).limit(limit);
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

async function updateRole(id, role) {
  return Users.updateOne({ _id: id }, { $set: { role } });
}

async function deleteStudentsByLastSession(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const result = await Users.deleteMany({
    role: 'student',
    lastSession: {
      $gte: start,
      $lte: end,
    },
  });

  return result.deletedCount;
}

//for testing purposes
async function deleteUser(id) {
  return Users.deleteOne({ _id: id });
}

//for testing purposes
async function getUsers(offset, limit) {
  return Users.find().skip(offset).limit(limit);
}

//for testing purposes
async function getUser(id) {
  return Users.findById(id);
}

module.exports = {
  getUsers,
  getUser,
  getAdminUsers,
  getUserByEmail,
  createUser,
  updateUserSession,
  deleteUser,
  deleteStudentsByLastSession,
  updateRole
};