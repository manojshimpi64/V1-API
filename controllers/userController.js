// userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;


const getUserData = async (req, res) => {
  try {
    const userData = await User.find({ _id: req.user.id });
    // Assuming userData is an array with at least one object
    if (userData.length > 0) {
      const { fullname, email, type , userpicture } = userData[0];
      res.status(200).json({fullname, email, type ,userpicture});
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).send("Failed to fetch user data");
  }
};

const createUser = async (req, res) => {
  const { fullname, password, email } = req.body;
  let success = false;

  try {
    // let existingUsername = await User.findOne({ username });

    // if (existingUsername) {
    //   return res.status(400).json({ success, error: "User with this username already exists" });
    // }

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success, error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      password: hashedPassword,
      email,
      type: "USER",
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    success = true;
    const authtoken = jwt.sign(data, jwtSecret);
    res.json({ success, authtoken });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  let success = false;
  const { email, password, type } = req.body; // Assuming you receive userType in the request

  try {
    const user = await User.findOne({ email, type }); // Include userType in the query

    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Invalid credentials" });
    }

    const data = {
      user: {
        id: user.id,
        type: user.type,
      },
    };

    success = true;
    const authtoken = jwt.sign(data, jwtSecret);

    res.json({ success, authtoken, userType: user.type});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};


module.exports = {
  getUserData,
  createUser,
  loginUser,
};
