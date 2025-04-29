
const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules
const projectValidation = [
  body('title').notEmpty().withMessage('Project title is required'),
  body('description').notEmpty().withMessage('Project description is required')
];

// Routes
router.get('/', protect, getProjects);
router.post('/', protect, projectValidation, createProject);
router.put('/:id', protect, projectValidation, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
