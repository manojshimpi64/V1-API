// taskController.js
const Task = require('../models/Task/Tasks');
const {emailMiddleware , sendMail}  = require('../middleware/emailMiddleware');


const uploadfile  = async (req,res)=>{

  res.send('File uploaded successfully!' + req.service);

}

const addTask = async (req, res) => {
  const { title, description, status } = req.body;
  let success = false;

  try {
    let task = await Task.findOne({ title });

    if (task) {
      return res.status(400).json({ success, error: "Task with this title already exists" });
    }

    /*task = await Task.create({
        name: name,
        description: description,
        status: status,
      });*/
    const newTask = new Task({
      title,
      description,
      status,
      user: req.user.id,
    });

    await newTask.save();
    success = true;

    // Email sending options
      let user={
          subject:'Congratulations, You Have Successfully Registered!',
          username: "manoj",
          password:"dsdsdsdsd",
          email_id:'myangular87@gmail.com'
      };
        sendMail(user, info => {
          console.log(`The mail has send 😃 and the id is ${info.messageId}`);
          //res.send(info);
      });

    res.json({ success, message: "Task added successfully" });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.json({ success: true, message: "Task Status Updated Successfully" });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const editTask = async (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();

    res.json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  addTask,
  fetchTasks,
  updateTaskStatus,
  editTask,
  uploadfile
};
