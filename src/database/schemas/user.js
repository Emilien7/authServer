const Mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const userSchema = new Mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    default: Date.now
  },
  token: {
    type: String,
    default: uuidv4()
  },
  regDate: {
    type: String,
    default: new Date()
  },
  birthDate: {
    type: String
  },
  name: {
    type: String
  },
  surname: {
    type: String
  }
});

module.exports = userSchema;