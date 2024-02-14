require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./middleware/passportConfig'); // Assuming you have passportConfig middleware

const { loggerMiddleware, logger, manualCleanup } = require('./middleware/loggerMiddleware');
const service = require('./service/service');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('ApiMaster'));
app.use('/files', express.static('files'));

// Create a stream object with a 'write' function that will be used by `morgan`
loggerMiddleware.stream = { write: (message) => logger.info(message) };

// Use the logger instance for morgan
app.use(morgan('common', { stream: loggerMiddleware.stream }));

// If you want to delete manually, then enable the function
 //manualCleanup()

const connectToMongo = require('./config/dbconnection/db');
connectToMongo();

app.use(cors({
  origin: 'http://localhost:9000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow including cookies
  optionsSuccessStatus: 204, // Pre-flight response status code
}));

app.use((req, res, next) => {
  req.service = service;
  next();
});

app.use(
  session({
    secret: 'manojshimpi', // Change this to your secret key
    resave: true,
    saveUninitialized: true,
  })
);

// Initialize and use passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public')); // Replace with the actual path

app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/Task/task'));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace
  logger.error(err.message, { stack: err.stack });

  res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Rest Api app listening on port ${port}`);
});