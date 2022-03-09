const jwt = require('jsonwebtoken');

// @desc    signing access token for user
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

// @desc    verifying access token from user that being sent on header
module.exports.verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new Error('UNAUTHORIZED');
  }
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      // throw error object
      throw err;
    }
    // send jwt payload to next middleware
    req.payload = payload;
    next();
  });
};
