/* global $*/

$(document).ready(() => {
    $.getJSON('/api/todos/')
        .then(addTodos)
        .catch(e => console.log('Error getting todos: ' + e.toString()));
    
    $('#todoInput').keypress(e => {
        if (!$('#todoInput').val().trim()) return;
        if (e.which === 13) createTodo();
    });
    
    $('.list').on('click', 'span', e => {
        e.stopPropagation();
        removeTodo($(e.target).attr('data-id'), $(e.target));
    });

    $('.list').on('click', 'li', e => {
        updateTodoStatus($(e.target));
    });
});

const addTodos = (todos) => {
    todos.forEach( addTodo);
}

const addTodo = todo => {
   let newTodo = $(`<li class="task">${todo.name}<span data-id="${todo._id}">X</span></li>`);
   if (todo.completed) newTodo.addClass('done');
   $('.list').append(newTodo);
}

const createTodo = () => {
    $.post('/api/todos/', {name: $('#todoInput').val()})
        .then(newTodo => {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch( e => console.log('Error creating todo: ' + e.toString()));
}

const removeTodo = (id, element) => {
    $.ajax(`/api/todos/${id}`, {method: 'DELETE'})
        .then( res => element.parent().remove())
        .catch( e => console.log(`Error deleting todo: ${e.toString()}`));
}

const updateTodoStatus = (element) => {
    let changeTo = !element.hasClass('done');
    let id = element.find('span').attr('data-id');
    $.ajax(`/api/todos/${id}`, {method: 'PUT', data: {completed: changeTo}})
        .then(() => (changeTo) ? element.addClass('done') : element.removeClass('done'))
        .catch( e => console.log(`Error completing todo: ${e.toString()}`));
}