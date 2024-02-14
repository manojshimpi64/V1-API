// models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userpicture: {
    type: String, // Assuming the userpicture is a URL or path to the image
  },
  password: {
    type: String,
  },
  type: {
    type: String,
  },
  googleId: {     
    type: String,
  },
  googleEmail: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
