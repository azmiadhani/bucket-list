// @desc  Handling validation error
const handleValidationError = (err, res) => {
  let statusCode = 400;
  let message = 'Validation Error';
  let errors = {};
  Object.values(err.errors).forEach(({ properties }) => {
    errors[properties.path] = properties.message;
  });

  return { statusCode, message, errors };
};

// @desc  Handling duplicate key error
const handleDuplicateKeyError = (err, res) => {
  let statusCode = 400;
  let message = 'Duplicate Key Error';
  let errors = {};
  if (err.code === 11000) {
    Object.entries(err.keyValue).forEach(([key, value]) => {
      errors[key] = `${value} is already taken`;
    });
  }

  return { statusCode, message, errors };
};

// @desc Error handling middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let errorObject = {};

  // custom extra handler
  try {
    // if error is validation error
    if (err.name === 'ValidationError')
      errorObject = handleValidationError(err, res);
    // if error is duplicate key error
    if (err.code && err.code == 11000)
      errorObject = handleDuplicateKeyError(err, res);
  } catch (e) {
    errorObject = {
      statusCode: 500,
      message: 'Internal Server Error',
    };
  }

  // filling error object
  // if there is no extra handler match
  if (Object.keys(errorObject).length === 0) {
    // default error
    errorObject = {
      statusCode: 500,
      message: err.message,
      errors: {},
    };
  }
  // stack & error for development purposes
  errorObject['stack'] =
    process.env.NODE_ENV === 'production' ? '-' : err.stack;
  errorObject['object'] = process.env.NODE_ENV === 'production' ? '-' : err;
  // set statusCode and delete errorObject.statusCode property
  statusCode = errorObject.statusCode;
  delete errorObject.statusCode;

  // send error response
  res.status(statusCode).json(errorObject);
};

module.exports = {
  errorHandler,
};
