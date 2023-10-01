// Charge les tâches du localStorage au démarrage de la page
document.addEventListener("DOMContentLoaded", function() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(taskObj => {
    addTask(taskObj.text, taskObj.priority, taskObj.isDone);
  });
});

function addTask(taskText = "", priority = "Priorité passable", isDone = false) {
  const taskInput = document.getElementById('taskInput');
  const priorityInput = document.getElementById('priorityInput');
  
  if (taskText === "") {
    taskText = taskInput.value.trim();
    priority = priorityInput.value;
  }

  if (taskText === '') {
    return;
  }

  const taskList = document.getElementById('taskList');
  const taskElement = document.createElement('li');
  taskElement.classList.add('task-item');
  
  taskElement.innerHTML = `
    <span class="task" data-priority="${priority}">${taskText}</span>
    <span class="priority-label ${getPriorityClass(priority)}">${priority}</span>
    <button onclick="toggleTask(event)" class="toggle-button bg-green-500 text-white p-1 rounded ml-2">Done</button>
    <button onclick="deleteTask(event)" class="delete-button bg-red-500 text-white p-1 rounded ml-2">Delete</button>
  `;

  if (isDone) {
    taskElement.querySelector('.task').classList.add('line-through', 'text-gray-500');
  }

  taskList.appendChild(taskElement);
  taskInput.value = '';
  saveTasks();
  sortTasks();
}

// Sauvegarde les tâches dans le localStorage
function saveTasks() {
  const taskElements = document.querySelectorAll('.task-item');
  const tasks = [];

  taskElements.forEach(taskElement => {
    const taskTextElement = taskElement.querySelector('.task');

    if (!taskTextElement) {
      return;
    }

    tasks.push({
      text: taskTextElement.textContent,
      priority: taskTextElement.getAttribute("data-priority"),
      isDone: taskTextElement.classList.contains('line-through'),
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Bascule une tâche entre terminée et non terminée
function toggleTask(event) {
  const task = event.target.parentElement.querySelector('.task');

  if (task.classList.contains('line-through')) {
    task.classList.remove('line-through', 'text-gray-500');
  } else {
    task.classList.add('line-through', 'text-gray-500');
  }
  
  saveTasks();
}

// Supprime une tâche
function deleteTask(event) {
  const taskElement = event.target.parentElement;
  taskElement.remove();
  saveTasks();
}

// Trie les tâches selon leur priorité
function sortTasks() {
  const taskList = document.getElementById('taskList');
  const tasksArray = Array.from(taskList.getElementsByTagName('li'));

  tasksArray.sort((a, b) => {
    const taskElementA = a.querySelector('.task');
    const taskElementB = b.querySelector('.task');

    if (!taskElementA || !taskElementB) {
      return 0;
    }

    const priorityA = taskElementA.getAttribute('data-priority');
    const priorityB = taskElementB.getAttribute('data-priority');
    return getPriorityValue(priorityA) - getPriorityValue(priorityB);
  });

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  tasksArray.forEach(node => taskList.appendChild(node));
}

// Fonction auxiliaire pour transformer la priorité en valeur numérique
function getPriorityValue(priority) {
  switch (priority) {
    case 'Priorité urgente':
      return 3;
    case 'Priorité normale':
      return 2;
    case 'Priorité passable':
      return 1;
    default:
      return 0;
  }
}

// Fonction auxiliaire pour obtenir la classe CSS en fonction de la priorité
function getPriorityClass(priority) {
  switch (priority) {
    case 'Priorité urgente':
      return 'bg-red-800 px-2 py-1 text-xs rounded-full text-red-100';
    case 'Priorité normale':
      return 'bg-blue-800 px-2 py-1 text-xs rounded-full text-blue-100';
    case 'Priorité passable':
      return 'bg-green-800 px-2 py-1 text-xs rounded-full text-green-100';
    default:
      return 'bg-gray-300 text-black';
  }
}