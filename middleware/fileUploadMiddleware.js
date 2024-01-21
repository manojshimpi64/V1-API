const multer = require('multer');

const createFileUploadMiddleware = (destinationPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const splittedFilename = file.originalname.split('.', 3);
      const imageName = splittedFilename[0];
      const imageExtension = splittedFilename[1];
      cb(null, `${imageName}-${Date.now()}.${imageExtension}`);
    }
  });

  return multer({ storage: storage });
};

module.exports = {
  createFileUploadMiddleware: createFileUploadMiddleware
};
