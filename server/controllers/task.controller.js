
const { Task, TaskStatus } = require('../models/task.model');
const Project = require('../models/project.model');
const { validationResult } = require('express-validator');

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    // Find all projects belonging to this user
    const projects = await Project.find({ userId: req.user._id }).select('_id');
    const projectIds = projects.map(project => project._id);
    
    // Find all tasks associated with the user's projects
    const tasks = await Task.find({ projectId: { $in: projectIds } }).sort({ createdAt: -1 });
    
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get tasks for a specific project
const getTasksByProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check project belongs to user
    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const tasks = await Task.find({ projectId: req.params.projectId }).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Get project tasks error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { title, description, projectId } = req.body;

    // Verify the project exists and belongs to the user
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const task = new Task({
      title,
      description,
      status: TaskStatus.TODO,
      projectId,
      completedAt: null
    });

    const savedTask = await task.save();
    res.status(201).json({ success: true, task: savedTask });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { title, description, status } = req.body;

    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check if task's project belongs to the user
    const project = await Project.findById(task.projectId);
    if (!project || project.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    
    // If status changes to COMPLETED, update completedAt
    if (status && status !== task.status) {
      task.status = status;
      if (status === TaskStatus.COMPLETED) {
        task.completedAt = new Date();
      } else if (task.status === TaskStatus.COMPLETED) {
        task.completedAt = null;
      }
    }

    const updatedTask = await task.save();
    res.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Check if task's project belongs to the user
    const project = await Project.findById(task.projectId);
    if (!project || project.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ success: true, message: 'Task removed' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask
};
