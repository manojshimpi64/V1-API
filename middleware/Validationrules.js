const { body } = require('express-validator');

const registerValidationRules = [
  body('fullname', 'Enter Valid Name').isLength({ min: 5 }),
  body('username', 'Enter Valid Username').isLength({ min: 5 }),
  body('password', 'Password Should be 5 digits').isLength({ min: 5 }),
  body('email', 'Email Should be Valid').isEmail(),
];

const loginValidationRules = [
    body("email", "Email Should be Valid").isEmail(),
    body("password", "Password can not be blank").notEmpty(),

  ];

  const taskValidationRules = [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),

  ];

  
    

module.exports = {
    registerValidationRules,
    loginValidationRules,
    taskValidationRules,
};
