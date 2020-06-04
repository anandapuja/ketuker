// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [ 6, 'too few charachters' ],
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: [ 10, 'too few charachters' ],
  },
});

userSchema.pre('save', async function (next) {
  const saltRounds = Number(process.env.SALT);
  const hash = await bcrypt.hash(this.password, saltRounds);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
