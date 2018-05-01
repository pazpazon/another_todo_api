const db = require('../models');

exports.getTodos = (req, res) => {
    db.Todo.find()
    .then( (todos) => res.json(todos))
    .catch( e => res.send(e));
};

exports.getTodo = (req, res) => {
    db.Todo.findById(req.params.todoId)
   .then((todo) => res.json(todo))
   .catch(e => res.send(e));
};

exports.postTodo = (req, res) => {
     db.Todo.create(req.body)
    .then( (newTodo) => res.status(201).json(newTodo))
    .catch(e => res.send(e));
};

exports.putTodo = (req, res) => {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
   .then(todo => res.json(todo))
   .catch(e => res.send(e));
};

exports.deleteTodo = (req, res) => {
    db.Todo.remove({_id: req.params.todoId})
   .then(todo => res.json(todo))
   .catch(e => res.send(e));
};

module.exports = exports;