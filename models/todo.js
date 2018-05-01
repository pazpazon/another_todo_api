const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank.'
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', toDoSchema);



module.exports = Todo;