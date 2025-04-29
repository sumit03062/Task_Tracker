
const Project = require('../models/project.model');
const { Task } = require('../models/task.model');
const { validationResult } = require('express-validator');

// Get all projects for a user
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new project
const createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    // Count existing projects
    const projectCount = await Project.countDocuments({ userId: req.user._id });
    
    // Limit to 4 projects per user
    if (projectCount >= 4) {
      return res.status(400).json({ 
        success: false, 
        message: 'You can only have up to 4 projects' 
      });
    }

    const { title, description } = req.body;

    const project = new Project({
      title,
      description,
      userId: req.user._id
    });

    const savedProject = await project.save();
    res.status(201).json({ success: true, project: savedProject });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { title, description } = req.body;

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check project belongs to user
    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Check project belongs to user
    if (project.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Delete project and all tasks associated with it
    await Task.deleteMany({ projectId: project._id });
    await project.deleteOne();

    res.json({ success: true, message: 'Project removed' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
