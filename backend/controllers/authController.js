const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwtHelper');

// @desc    User Sign Up
// @route   POST /api/auth/signup
// @access  Public
module.exports.signupPost = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.create({ email, password });
  const accessToken = await signAccessToken(user.id);
  const refreshToken = await signRefreshToken(user.id);
  console.log(accessToken);
  res.status(201).json({ accessToken, refreshToken });
});

// @desc    User Log In
// @route   POST /api/auth/login
// @access  Public
module.exports.loginPost = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.login(email, password);
  const accessToken = await signAccessToken(user.id);
  const refreshToken = await signRefreshToken(user.id);
  res.status(200).json({ accessToken, refreshToken });
});

// @desc    Refresh Token
// @route   POST /api/auth/refresh-token
// @access  Public
module.exports.refreshToken = asyncHandler(async (req, res) => {
  const refToken = req.body.refreshToken;
  const userId = await verifyRefreshToken(refToken);
  const accessToken = await signAccessToken(userId);
  const refreshToken = await signRefreshToken(userId);
  res.status(200).json({ accessToken, refreshToken });
});
