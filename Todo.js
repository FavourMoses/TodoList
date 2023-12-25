// script.js
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    let tasks = getTasksFromLocalStorage() || [];

    renderTasks();

    window.addTask = function () {
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.push(taskText);
            saveTasksToLocalStorage();
            taskInput.value = '';
            renderTasks();
        }
    };

    window.removeTask = function (index) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        renderTasks();
    };

    window.clearTasks = function () {
        tasks = [];
        saveTasksToLocalStorage();
        renderTasks();
    };

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="removeTask(${index})">Remove</button>
            `;
            taskList.appendChild(li);
        });
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('tasks'));
    }
});
