const { v4: uuidv4 } = require("uuid");
const { tasks } = require("../config/db");

const getTasks = (req, res) => {
  const userTasks = tasks.filter((task) => task.userId === req.user.id);
  res.json(userTasks);
};

const createTask = (req, res) => {
  const { title, description, status = "Pending" } = req.body;

  const newTask = {
    id: uuidv4(),
    userId: req.user.id,
    title,
    description,
    status,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, description, status } = req.body;

  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId && task.userId === req.user.id
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    description: description || tasks[taskIndex].description,
    status: status || tasks[taskIndex].status,
    updatedAt: new Date(),
  };

  res.json(tasks[taskIndex]);
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId && task.userId === req.user.id
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json({ message: "Task deleted successfully", task: deletedTask });
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
