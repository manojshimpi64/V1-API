// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/taskController');
const combinedMiddleware = require('../../middleware/validation');
const { taskValidationRules } = require('../../middleware/Validationrules');
const fetchuser = require('../../middleware/fetchuser');

const fileUploadMiddleware = require('../../middleware/fileUploadMiddleware').createFileUploadMiddleware;

const PATH = './files';
const pathProfile = './profile';

// Create dynamic middleware instances for different paths
const fileUpload = fileUploadMiddleware(PATH);
const profileUpload = fileUploadMiddleware(pathProfile);

router.post('/addtask',  fetchuser, fileUpload.single('file') ,combinedMiddleware(taskValidationRules), taskController.addTask); //http://localhost:3000/api/task/addtask
router.get('/fetchtasks', fetchuser, taskController.fetchTasks); //http://localhost:3000/api/task/fetchtasks
router.put('/updatetaskstatus/:taskId', fetchuser, taskController.updateTaskStatus); //http://localhost:3000/api/task/updatetaskstatus/put id
router.put('/edittask/:taskId', fetchuser, combinedMiddleware(taskValidationRules), taskController.editTask); //http://localhost:3000/api/task/edittask/put id
router.post('/upload', fetchuser,fileUpload.single('file'),taskController.uploadfile)

module.exports = router;
