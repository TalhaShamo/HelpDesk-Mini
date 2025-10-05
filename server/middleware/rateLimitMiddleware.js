const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  
  // Custom response handler when the limit is exceeded
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      error: {
        code: 'RATE_LIMIT',
        message: 'Too many requests, please try again after a minute.',
      },
    });
  },
});

module.exports = apiLimiter;