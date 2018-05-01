const express = require('express');

const helpers = require('../helpers/todos');
const router = express.Router();

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.postTodo);

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.putTodo)
    .delete(helpers.deleteTodo);

module.exports = router;