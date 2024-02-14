const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken
const jwtSecret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // Get the user from the JWT token and add id to req object
  const token = req.header('auth-token');
  const stringWithoutQuotes = token.slice(1, -1);
  if (!stringWithoutQuotes) {
    
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(stringWithoutQuotes, jwtSecret);

    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser;
