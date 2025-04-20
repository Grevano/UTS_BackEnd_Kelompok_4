const { Users } = require('../../../models');
const { ObjectId } = require('mongodb');
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

async function updateRolesByDateRange(startDate, endDate, role) {
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);
  
  if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
    throw new Error('Invalid date format for startDate or endDate');
  }
  
  return Users.updateMany(
    {
      lastSession: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    },
    { $set: { role } }
  );
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
  updateRolesByDateRange,
};