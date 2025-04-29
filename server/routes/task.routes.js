
const express = require('express');
const { getTasks, getTasksByProject, createTask, updateTask, deleteTask } = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const { body } = require('express-validator');
const { TaskStatus } = require('../models/task.model');

const router = express.Router();

// Validation rules
const taskCreateValidation = [
  body('title').notEmpty().withMessage('Task title is required'),
  body('description').notEmpty().withMessage('Task description is required'),
  body('projectId').notEmpty().withMessage('Project ID is required')
];

const taskUpdateValidation = [
  body('title').optional().notEmpty().withMessage('Task title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Task description cannot be empty'),
  body('status')
    .optional()
    .isIn(Object.values(TaskStatus))
    .withMessage('Invalid task status')
];

// Routes
router.get('/', protect, getTasks);
router.get('/:projectId', protect, getTasksByProject);
router.post('/', protect, taskCreateValidation, createTask);
router.put('/:id', protect, taskUpdateValidation, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;
