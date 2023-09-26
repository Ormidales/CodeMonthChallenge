// Vérifier si des tâches sont déjà enregistrées dans le LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    let savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => addTask(task));
    }
});

// Ajouter une nouvelle tâche
function addTask(taskText = null) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');

    let text = taskText ? taskText : document.getElementById('taskInput').value;
    if (!text) return;  // Ne rien faire si le texte est vide
    
    li.appendChild(document.createTextNode(text));
    li.onclick = function() {
        this.parentNode.removeChild(this);
        saveTasks();
    }
    
    ul.appendChild(li);
    
    // Sauvegarder les tâches
    saveTasks();
}

// Sauvegarder les tâches dans le LocalStorage
function saveTasks() {
    let taskNodes = document.querySelectorAll('#taskList li');
    let tasks = [];
    taskNodes.forEach(taskNode => tasks.push(taskNode.textContent));
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}