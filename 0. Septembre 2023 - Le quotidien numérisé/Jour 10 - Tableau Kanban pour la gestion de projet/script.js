document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todoList");
  const inProgressList = document.getElementById("inProgressList");
  const doneList = document.getElementById("doneList");

  // Charger les tâches depuis le stockage local
  const tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [
    { id: 1, status: "todo", content: "Tâche 1" },
    { id: 2, status: "inProgress", content: "Tâche 2" },
    { id: 3, status: "done", content: "Tâche 3" },
  ];

  const saveTasksToLocalStorage = () => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  };

  // Fonction pour changer la priorité d'une tâche
  const changeTaskPriority = (taskElement, task) => {
    taskElement.addEventListener("click", () => {
      const priority = prompt("Définir la priorité (bas, moyen, haut, none) :");
      
      if (priority === "bas") {
        task.priority = "low";
        taskElement.style.backgroundColor = "green";
      } else if (priority === "moyen") {
        task.priority = "medium";
        taskElement.style.backgroundColor = "yellow";
      } else if (priority === "haut") {
        task.priority = "high";
        taskElement.style.backgroundColor = "red";
      } else if (priority === "none") {
        task.priority = "none";
        taskElement.style.backgroundColor = "white";
      }

      // Sauvegarder la nouvelle priorité dans le stockage local
      saveTasksToLocalStorage();
    });
  };

  const createTaskElement = (task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "bg-white p-2 rounded";
    taskElement.innerText = task.content;
    taskElement.draggable = true;

    taskElement.addEventListener("dragstart", () => {
      taskElement.classList.add("dragging");
    });

    taskElement.addEventListener("dragend", () => {
      taskElement.classList.remove("dragging");
      saveTasksToLocalStorage(); // Sauvegarder les tâches lorsque l'une d'elles est déplacée
    });

    // Appliquer la couleur de priorité
    if (task.priority === "low") {
      taskElement.style.backgroundColor = "green";
    } else if (task.priority === "medium") {
      taskElement.style.backgroundColor = "yellow";
    } else if (task.priority === "high") {
      taskElement.style.backgroundColor = "red";
    } else if (task.priority === "none") {
      taskElement.style.backgroundColor = "white";
    }

    // Ajouter la possibilité de changer la priorité
    changeTaskPriority(taskElement, task);

    return taskElement;
  };

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    if (task.status === "todo") {
      todoList.appendChild(taskElement);
    } else if (task.status === "inProgress") {
      inProgressList.appendChild(taskElement);
    } else if (task.status === "done") {
      doneList.appendChild(taskElement);
    }
  });

  const lists = { todo: todoList, inProgress: inProgressList, done: doneList };

  Object.keys(lists).forEach((status) => {
    lists[status].addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingElement = document.querySelector(".dragging");
      lists[status].appendChild(draggingElement);

      // Mettre à jour le statut de la tâche dans l'objet `tasks`
      const taskToUpdate = tasks.find((task) => task.content === draggingElement.innerText);
      if (taskToUpdate) {
        taskToUpdate.status = status;
      }
    });
  });
});