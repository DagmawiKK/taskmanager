const Task = require('../models/Task');

// GET /api/tasks - Get all tasks with filtering and search
// GET /api/tasks?search=meeting
// GET /api/tasks?status=completed
exports.getTasks = async (req, res) => {
    try {
        const { status, search } = req.query;
        let query = {};

        if (status === 'completed') query.completed = true;
        else if (status === 'pending') query.completed = false;

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const tasks = await Task.find(query);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// POST /api/tasks - Add a new task
exports.createTask = async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
        }
        if (title.length > 100) {
            return res.status(400).json({ error: 'Title must not exceed 100 characters' });
        }
        if (body !== undefined && typeof body !== 'string') {
            return res.status(400).json({ error: 'Body must be a string' });
        }

        const lastTask = await Task.findOne().sort({ id: -1 });
        const newId = lastTask ? lastTask.id + 1 : 1;

        const newTask = new Task({
            id: newId,
            title: title.trim(),
            body: body ? body.trim() : '',
            completed: false,
        });

        await newTask.save();
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Task ID already exists' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

// PUT /api/tasks/:id - Update a task
exports.updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        const task = await Task.findOne({ id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const { completed, title, body } = req.body;

        if (typeof completed === 'boolean') task.completed = completed;
        if (typeof title === 'string' && title.trim() !== '') task.title = title.trim();
        if (typeof body === 'string') task.body = body.trim();

        task.updatedAt = new Date();

        await task.save();
        res.status(200).json({ success: true, message: 'Task updated successfully', data: task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// DELETE /api/tasks/:id - Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        const result = await Task.findOneAndDelete({ id });
        if (!result) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
