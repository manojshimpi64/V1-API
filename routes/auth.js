// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require("../controllers/authController");

const combinedMiddleware = require('../middleware/validation');
const { registerValidationRules, loginValidationRules } = require('../middleware/Validationrules');
const fetchuser = require('../middleware/fetchuser');

router.get('/userData', fetchuser, userController.getUserData); //http://localhost:3000/api/auth/userData
router.post('/createUser', combinedMiddleware(registerValidationRules), userController.createUser); //http://localhost:3000/api/auth/createUser
router.post('/login', combinedMiddleware(loginValidationRules), userController.loginUser); //http://localhost:3000/api/auth/login

router.get("/login/success", authController.successHandler);
router.get("/login/failed", authController.failureHandler);
router.get("/google", authController.googleAuthHandler);
router.get("/google/callback", authController.googleAuthCallbackHandler);
router.get("/logout", authController.logoutHandler);



module.exports = router;
