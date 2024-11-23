// Array to store tasks
let tasks = [];

// Get DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Function to add a new task
function addTask(e) {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    if (taskText !== '') {
        tasks.push({ id: Date.now(), text: taskText, completed: false });
        todoInput.value = '';
        renderTasks();
    }
}

// Function to toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// Function to render tasks
function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach((task) => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo';
        todoItem.innerHTML = `
            <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
            <label for="task-${task.id}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </label>
            <span class="todo-text">${task.text}</span>
            <button class="delete-button" onclick="deleteTask(${task.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
        `;
        todoList.appendChild(todoItem);

        // Add event listener for checkbox
        const checkbox = todoItem.querySelector(`#task-${task.id}`);
        checkbox.addEventListener('change', () => toggleTask(task.id));
    });
}

// Event listener for form submission
todoForm.addEventListener('submit', addTask);

// Initial render
renderTasks();