require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { loggerMiddleware, logger ,manualCleanup } = require('./middleware/loggerMiddleware');
const service = require('./service/service')
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('ApiMaster')); 
app.use('/files', express.static('files'));

// Create a stream object with a 'write' function that will be used by `morgan`
loggerMiddleware.stream = { write: (message) => logger.info(message) };

// Use the logger instance for morgan
app.use(morgan('common', { stream: loggerMiddleware.stream }));

//if you want delete manually then enable function
//manualCleanup() 

const connectToMongo = require('./config/dbconnection/db');
connectToMongo();

app.use((req,res,next)=>{
  req.service = service;
  next();
})


app.use('/api/auth', require('./routes/auth'));
app.use('/api/task', require('./routes/Task/task'));

// Error handling middleware should be placed at the end
app.use((err, req, res, next) => {
  // Log the error using the defined logger
  logger.error(err.message, { stack: err.stack });

  // Continue with the error handling
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Rest Api app listening on port ${port}`);
});
