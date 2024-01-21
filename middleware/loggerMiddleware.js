const winston = require('winston');
const { format } = require('winston');
const fs = require('fs');
const path = require('path');
const stackTraceParser = require('stack-trace-parser');

const logsDirectory = path.join(__dirname, '../logs');

if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const getCurrentDatetime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = `0${now.getMonth() + 1}`.slice(-2);
  const day = `0${now.getDate()}`.slice(-2);
  const hours = `0${now.getHours()}`.slice(-2);
  const minutes = `0${now.getMinutes()}`.slice(-2);
  const seconds = `0${now.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

const logger = winston.createLogger({
  levels: {
    verbose: 0,
    info: 1,
    debug: 2,
    warn: 3,
    error: 4,
  },
  level: 'warn',
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, `error_${getCurrentDatetime()}.log`),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logsDirectory, `info_${getCurrentDatetime()}.log`),
      level: 'info',
    }),
  ],
});

const loggerMiddleware = (req, res, next) => {
  const logMessage = `${req.ip} - ${req.method} ${req.originalUrl}`;
  logger.verbose(logMessage);
  next();
};

loggerMiddleware.handleError = (err, req, res, next) => {
  if (err) {
    const logError = `${req.ip} - ${req.method} ${req.originalUrl} - ERROR: ${err.message} - CODE: ${err.code}`;

    const trace = stackTraceParser.parse(err.stack);

    if (trace.length > 0) {
      const fileName = trace[0].fileName;
      const lineNumber = trace[0].lineNumber;
      const errorLogMessage = `${logError} - FILE: ${fileName} - LINE: ${lineNumber}`;
      logger.error(errorLogMessage);
    } else {
      logger.error(logError);
    }
  }

  next(err);
};

// Cleanup old log files (delete files older than 7 days)
const cleanupOldLogs = () => {
  const now = new Date();
  const cutoffDate = new Date(now - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  fs.readdirSync(logsDirectory).forEach((file) => {
    const filePath = path.join(logsDirectory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile() && fileStat.ctime < cutoffDate) {
      fs.unlinkSync(filePath);
    }
  });
};

// Run cleanup every day (adjust the interval as needed)
setInterval(cleanupOldLogs, 24 * 60 * 60 * 1000); // 24 hours

// Manual cleanup function
const manualCleanup = () => {
  console.log('Performing manual log file cleanup...');
  fs.readdirSync(logsDirectory).forEach((file) => {
    const filePath = path.join(logsDirectory, file);
    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    }
  });
  console.log('Manual log file cleanup complete.');
};

// Expose manual cleanup function
module.exports = { loggerMiddleware, logger, manualCleanup };
