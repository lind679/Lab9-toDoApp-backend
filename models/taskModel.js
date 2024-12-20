// models/taskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
