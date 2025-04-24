const usersRepository = require('./users-repository');

async function emailExists(email) {
  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function getAdminUsers(offset, limit) {
  return usersRepository.getAdminUsers(offset, limit);
}

async function createUser(email, password, fullName, role, lastSession) {
  return usersRepository.createUser(email, password, fullName, role, lastSession);
}

async function deleteStudentsByLastSession(startDate, endDate) {
  return usersRepository.deleteStudentsByLastSession(startDate, endDate);
}

async function updateRole(id, role) {
  const user = await usersRepository.getUser(id);
  if (!user) {
    throw new Error('User not found');
  }
  return usersRepository.updateRole(id, role);
}


//for testing purposes
async function deleteUser(id) {
  return usersRepository.deleteUser(id);
}
//for testing purposes
async function getUser(id) {
  return usersRepository.getUser(id);
}
//for testing purposes
async function getUsers(offset, limit) {
  return usersRepository.getUsers(offset, limit);
}

module.exports = {
  emailExists,
  getAdminUsers,
  createUser,
  deleteStudentsByLastSession,
  updateRole,
  deleteUser,
  getUser,
  getUsers,
};