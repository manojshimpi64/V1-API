const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
    unique: true, // Set the unique constraint
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    maxlength: 50,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
