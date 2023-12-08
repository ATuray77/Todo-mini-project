// function createPost({title, body}) {
//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({
//             title: title,
//             body: body
//         }),
//         headers: {
//             'Content-Type': 'application/json',
//             token: 'abc123'
//         }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data));
      
// }

// createPost({title: 'My Post', body: 'This is my Post'})

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

const getTodos = () => {
    fetch(apiUrl + '?_limit=5')
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            data.forEach((todo) => addTodoToDOM(todo));
        });
};

const addTodoToDOM = (todo) => {
    const div = document.createElement('div');
            div.classList.add('todo')
            div.appendChild(document.createTextNode(todo.title));
            div.setAttribute('data-id', todo.id);

            if (todo.completed) {
                div.classList.add('done')
            }

            document.getElementById('todo-list').appendChild(div)
};

const createTodo = (e) => {
    e.preventDefault();

    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(r => r.json())
    .then(data => addTodoToDOM(data))
};

const toggleCompleted = (e) => {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done');
    } 
    upDateTodo(e.target.dataset.id, e.target.classList.contains('done'))
    
};

function upDateTodo(id, completed) {
   fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ completed }),
    headers: {
        'Content-Type': 'application/json'
    }
   })
   .then(r => r.json())
   .then(data => console.log(data))
};

const deleteTodo = (e) => {
    if (e.target.classList.contains('todo')) {
       const id = e.target.dataset.id
       fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
       })
       .then(r => r.json())
       .then(() => e.target.remove())
    }
};

const init = () => {

    document.addEventListener('DOMContentLoaded', getTodos())
    document.querySelector('#todo-form').addEventListener('submit', createTodo )
    document.querySelector('#todo-list').addEventListener('click', toggleCompleted )
    document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo )
}

init();
