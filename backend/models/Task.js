const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, maxlength: 100 },
    completed: { type: Boolean, default: false },
    body: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { collection: 'taskmanager' });

module.exports = mongoose.model('Task', taskSchema);