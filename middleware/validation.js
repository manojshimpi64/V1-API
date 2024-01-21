const {validationResult } = require('express-validator');

const combinedMiddleware = (specificValidationRules) => [...specificValidationRules,(req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, errors: error.array() });
    }

    next();
  },  
];

module.exports = combinedMiddleware;
