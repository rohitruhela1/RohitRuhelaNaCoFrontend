document.addEventListener("DOMContentLoaded", () => {
  // Get references to all required DOM elements
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const moveRightButton = document.getElementById("moveRightButton");
  const moveLeftButton = document.getElementById("moveLeftButton");
  const todoList = document.getElementById("todoList");
  const completeList = document.getElementById("completeList");

  // Function to save tasks in localStorage for persistence
  const saveTasks = () => {
    localStorage.setItem("todoList", todoList.innerHTML);
    localStorage.setItem("completeList", completeList.innerHTML);
  };

  // Function to load tasks from localStorage on page load
  const loadTasks = () => {
    todoList.innerHTML = localStorage.getItem("todoList") || "";
    completeList.innerHTML = localStorage.getItem("completeList") || "";
    attachTaskEventListeners(todoList);
    attachTaskEventListeners(completeList);
  };

  // Function to attach click event listeners to tasks for selection
  const attachTaskEventListeners = (list) => {
    list.querySelectorAll("li").forEach((task) => {
      task.addEventListener("click", () => {
        task.classList.toggle("selected");
      });
    });
  };

  // Function to add a new task to the "To-Do" list
  const addTask = () => {
    const taskName = taskInput.value.trim(); // Get the task name and trim whitespace
    if (taskName) {
      // Check if the task already exists in the todoList
      const tasks = Array.from(todoList.children).map(
        (task) => task.textContent
      );
      if (tasks.includes(taskName)) {
        alert("Task already exists!"); 
        return;
      }

      const task = document.createElement("li");
      task.textContent = taskName;
      task.addEventListener("click", () => {
        task.classList.toggle("selected");
      });
      todoList.appendChild(task); 
      taskInput.value = ""; 
      saveTasks(); 
    }
  };

  // Function to move selected tasks from one list to another
  const moveTasks = (fromList, toList) => {
    const selectedTasks = fromList.querySelectorAll(".selected");
    selectedTasks.forEach((task) => {
      task.classList.remove("selected");
      toList.appendChild(task);
    });
    saveTasks();
  };

  // Function to remove selected tasks from a list
  const removeSelectedTasks = (list) => {
    const selectedTasks = list.querySelectorAll(".selected");
    selectedTasks.forEach((task) => task.remove());
    saveTasks();
  };

  // Function to update button labels for responsiveness
  const updateButtonLabels = () => {
    const moveRightButton = document.getElementById("moveRightButton");
    const moveLeftButton = document.getElementById("moveLeftButton");

    if (window.innerWidth <= 600) {
      // For small screens, update button text
      moveRightButton.textContent = "MOVE TO DOWN";
      moveLeftButton.textContent = "MOVE TO UP";
    } else {
      // For larger screens, reset button text
      moveRightButton.textContent = "MOVE TO RIGHT >";
      moveLeftButton.textContent = "MOVE TO LEFT <";
    }
  };

  // Event listener for the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Event listener for the "Remove Task" button
  removeButton.addEventListener("click", () => {
    removeSelectedTasks(todoList);
    removeSelectedTasks(completeList);
  });

  // Event listener for the "Move to Complete" button
  moveRightButton.addEventListener("click", () => {
    moveTasks(todoList, completeList);
  });

  // Event listener for the "Move to To-Do" button
  moveLeftButton.addEventListener("click", () => {
    moveTasks(completeList, todoList);
  });

  // Update button labels for the initial screen size
  updateButtonLabels();

  // Event listener for window resize to adjust button labels dynamically
  window.addEventListener("resize", updateButtonLabels);

  // Load saved tasks from localStorage on page load
  loadTasks();
});
