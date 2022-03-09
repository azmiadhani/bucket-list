const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { signAccessToken } = require('../helpers/jwtHelper');

// @desc    User Sign Up
// @route   POST /api/auth/signup
// @access  Public
module.exports.signupPost = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //   console.log(email, password);

  const user = await userModel.create({ email, password });
  const accessToken = await signAccessToken(user.id);
  // const token = createToken(user._id);
  console.log(accessToken);
  res.status(201).json({ accessToken });
});

// @desc    User Log In
// @route   POST /api/auth/login
// @access  Public
module.exports.loginPost = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.login(email, password);
  const accessToken = await signAccessToken(user.id);
  res.status(200).json({ accessToken });
});
