// middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Use the status code from the response if it's set, otherwise default to 500
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Default error code based on status
  let errorCode;
  switch (statusCode) {
    case 400:
      errorCode = 'BAD_REQUEST';
      break;
    case 401:
      errorCode = 'UNAUTHORIZED';
      break;
    case 403:
      errorCode = 'FORBIDDEN';
      break;
    case 404:
      errorCode = 'NOT_FOUND';
      break;
    case 409:
      errorCode = 'CONFLICT';
      break;
    default:
      errorCode = 'INTERNAL_SERVER_ERROR';
  }

  // Check for specific Mongoose validation errors to provide field info
  let field = null;
  if (err.name === 'ValidationError') {
    field = Object.keys(err.errors)[0];
    errorCode = 'FIELD_INVALID';
  }
  
  // Check for duplicate key error from MongoDB
  if (err.code === 11000) {
    field = Object.keys(err.keyPattern)[0];
    errorCode = 'DUPLICATE_FIELD';
  }


  res.status(statusCode).json({
    error: {
      code: errorCode,
      field: field, // This will be null if not a specific field error
      message: err.message,
    },
  });
};

module.exports = { errorHandler };