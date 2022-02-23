const mongoose = require('mongoose');

// @desc    check if objectId of mongodb is valid
// @access  Private
const objectIdCheck = (id, req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return true;
  }
  return false;
};

module.exports = {
  objectIdCheck,
};
