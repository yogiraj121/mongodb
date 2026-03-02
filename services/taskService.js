const Task = require('../models/Task');

class TaskService {
    async createTask(data) {
        return await Task.create(data);
    }

    async getAllTasks(query = {}) {
        return await Task.find(query).sort({ createdAt: -1 });
    }

    async getTaskById(id) {
        return await Task.findById(id);
    }

    async updateTask(id, data) {
        return await Task.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }
}

module.exports = new TaskService();
