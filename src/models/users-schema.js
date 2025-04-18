module.exports = (mongoose) =>
  mongoose.model(
    'Users',
    new mongoose.Schema({
      email: String,
      password: String,
      fullName: String,
      role: String,
      lastSession: Date,
    })
  );

