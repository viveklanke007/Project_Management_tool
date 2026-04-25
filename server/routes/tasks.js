const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');

// Get tasks by project
router.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    deadline: req.body.deadline,
    status: req.body.status,
    priority: req.body.priority || 'Medium',
    projectId: req.body.projectId
  });

  try {
    const newTask = await task.save();
    // Update project progress (simple logic for now)
    await updateProjectProgress(req.body.projectId);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await updateProjectProgress(updatedTask.projectId);
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    const projectId = task.projectId;
    await Task.findByIdAndDelete(req.params.id);
    await updateProjectProgress(projectId);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment to a task
router.post('/:id/comments', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.comments.push({
            text: req.body.text,
            author: req.body.author
        });
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function updateProjectProgress(projectId) {
    const totalTasks = await Task.countDocuments({ projectId });
    if (totalTasks === 0) {
        await Project.findByIdAndUpdate(projectId, { progress: 0 });
        return;
    }
    const completedTasks = await Task.countDocuments({ projectId, status: 'Done' });
    const progress = Math.round((completedTasks / totalTasks) * 100);
    await Project.findByIdAndUpdate(projectId, { progress });
}

module.exports = router;
