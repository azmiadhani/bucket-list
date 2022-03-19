module.exports.generateCustomApiError = (
  errorStatusCode,
  errorMessage,
  errorObject
) => {
  return {
    name: 'CustomApiError',
    statusCode: errorStatusCode,
    message: errorMessage,
    errors: errorObject ? errorObject : {},
  };
};
