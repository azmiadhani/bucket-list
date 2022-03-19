const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const httpStatusCodes = require('../helpers/httpStatusCodesHelper');
const { generateCustomApiError } = require('../helpers/customApiErrorHelper');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  {
    timestamps: true,
  }
);

// hook before saving a document to the database
userSchema.pre('save', async function (next) {
  // "this" refers to the user document

  // hash password that user enter
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  var errorMessage = 'Sign in failed, please try again';
  // input validation
  if (!email || !password) {
    let tempErrorObject = {};
    if (!email) tempErrorObject.email = 'Please enter your email';
    if (!password) tempErrorObject.password = 'Please enter your password';
    throw generateCustomApiError(httpStatusCodes.BAD_REQUEST, errorMessage, {
      ...tempErrorObject,
    });
    return;
  }
  // check if email is valid to db
  const user = await this.findOne({ email });
  // if user not found
  if (!user) {
    throw generateCustomApiError(httpStatusCodes.BAD_REQUEST, errorMessage, {
      email: 'Email not found',
    });
    return;
  }
  // check entered password and db password
  const auth = await bcrypt.compare(password, user.password);
  if (auth) {
    return user;
  }
  throw generateCustomApiError(httpStatusCodes.BAD_REQUEST, errorMessage, {
    password: 'Invalid password',
  });
  return;
};

module.exports = mongoose.model('users', userSchema);
