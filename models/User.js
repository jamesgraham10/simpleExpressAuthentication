const mongoose = require('../db');
const bcrypt = require('bcrypt-nodejs');

let userSchema = mongoose.Schema({
  username: String,
  password: String
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);