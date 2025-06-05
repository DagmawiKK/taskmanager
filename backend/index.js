const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect(`mongodb+srv://dagikas22:${process.env.DB_PASSWORD}@cluster0.b958c.mongodb.net/task-manager?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', taskRoutes);

// Simple HTML page to indicate API is running
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Task Manager API</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #333; }
                p { color: #666; }
            </style>
        </head>
        <body>
            <h1>Task Manager API</h1>
            <p>API is running. Use endpoints: /api/tasks, /api/tasks?status=completed, /api/tasks?status=pending</p>
        </body>
        </html>
    `);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});