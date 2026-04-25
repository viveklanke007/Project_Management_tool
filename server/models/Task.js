const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: { type: String },
  deadline: { type: Date },
  status: { type: String, enum: ['Todo', 'In Progress', 'Review', 'Done'], default: 'Todo' },
  priority: { type: String, enum: ['Urgent', 'High', 'Medium', 'Low'], default: 'Medium' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  comments: [{
    text: String,
    author: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
