const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


const User = require('../models/User');

exports.successHandler = (req, res) => {
   if (req.user) {
      res.status(200).json({
         error: false,
         message: 'Successfully Logged In',
         user: req.user,
      });
   } else {
      res.status(403).json({ error: true, message: 'Not Authorized' });
   }
};

exports.failureHandler = (req, res) => {
   res.status(401).json({
      error: true,
      message: 'Log in failure',
   });
};

exports.googleAuthHandler = passport.authenticate('google', ['profile', 'email']);

exports.googleAuthCallbackHandler = (req, res, next) => {
    passport.authenticate('google', async (err, user) => {
       if (err) {
          // Handle error
          console.error(err);
          res.redirect('/login/failed');
       } else {
          // Extract relevant data from Google profile
          const { id, emails, displayName,photos} = user;
          
          // Check if the user already exists in your database
          let existingUser = await User.findOne({ googleId: id });
 
          if (!existingUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(`google_${id}`, salt);
             // If the user doesn't exist, create a new user in the database
             existingUser = await User.create({
                fullname: displayName,
                email: emails[0].value,
                userpicture:photos[0].value,
                username: `google_${id}`, // Set a unique and non-null value for username
                password: hashedPassword, // Set a password based on your requirements
                type: 'USER', // Set the user type as needed
                googleId: id, // Store Google's user ID
             });
          }
          
          // Generate a JWT token
         const data = {
            user: {
               id: existingUser.id,
            },
         };
         const authtoken = jwt.sign(data, jwtSecret);
          
         // Redirect to the frontend URL after successful authentication
         res.redirect(`${process.env.CLIENT_URL}/?token=${authtoken}`);
         //res.redirect(process.env.CLIENT_URL);
       }
    })(req, res, next);
 };

exports.logoutHandler = (req, res) => {
   // Use req.logout() with a callback function
   req.logout(() => {
      res.redirect(process.env.CLIENT_URL);
   });
};

module.exports = exports;
