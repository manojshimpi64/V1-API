// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const combinedMiddleware = require('../middleware/validation');
const { registerValidationRules, loginValidationRules } = require('../middleware/Validationrules');
const fetchuser = require('../middleware/fetchuser');

router.get('/userData', fetchuser, userController.getUserData); //http://localhost:3000/api/auth/userData
router.post('/createUser', combinedMiddleware(registerValidationRules), userController.createUser); //http://localhost:3000/api/auth/createUser
router.post('/login', combinedMiddleware(loginValidationRules), userController.loginUser); //http://localhost:3000/api/auth/login

module.exports = router;
