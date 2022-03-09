const jwt = require('jsonwebtoken');

// @desc    signing access token for user
// @param
module.exports.signAccessToken = async (userId) => {
  const payload = {};
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const options = {
    expiresIn: '1h',
    issuer: 'https://azmiadhani.com',
    audience: userId,
  };
  return jwt.sign(payload, secret, options);
};
