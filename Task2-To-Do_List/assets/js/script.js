document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const moveRightButton = document.getElementById("moveRightButton");
  const moveLeftButton = document.getElementById("moveLeftButton");
  const todoList = document.getElementById("todoList");
  const completeList = document.getElementById("completeList");
  const toaster = document.getElementById("toaster");
  const toasterMessage = document.getElementById("toasterMessage");
  const undoButton = document.getElementById("undoButton");

  let lastAction = null; // Tracks the last action (add, remove, move)
  let lastRemovedTasks = []; // Tracks removed tasks
  let lastMovedTasks = []; // Tracks moved tasks
  let lastAddedTask = null; // Tracks the last added task
  let suppressToaster = false; // Flag to suppress toaster during Undo

  // Function to show toaster messages (5 seconds for removal)
  let toasterTimeout; 

  // toaster funtion for 5 sec

  const showToaster = (message) => {
    if (!suppressToaster) {
      clearTimeout(toasterTimeout);

      toasterMessage.textContent = message;
      toaster.classList.remove("hidden");
      undoButton.classList.remove("hidden1");

      toasterTimeout = setTimeout(() => {
        toaster.classList.add("hidden");
        undoButton.classList.remove("hidden1");
      }, 5000);
    }
  };

  // Function to show toaster messages (3 seconds for move actions)
  const showToasterForMove = (message) => {
    if (!suppressToaster) {
      clearTimeout(toasterTimeout);

      toasterMessage.textContent = message;
      
      // do not want the undo button for move,add
      // undoButton.classList.remove("hidden1");
      toaster.classList.remove("hidden");

      toasterTimeout = setTimeout(() => {
        // undoButton.classList.remove("hidden1");
        toaster.classList.add("hidden");
      }, 3000);
    }
  };

  // saving task in localstorgae
  const saveTasks = () => {
    localStorage.setItem("todoList", todoList.innerHTML);
    localStorage.setItem("completeList", completeList.innerHTML);
  };

  // load task

  const loadTasks = () => {
    todoList.innerHTML = localStorage.getItem("todoList") || "";
    completeList.innerHTML = localStorage.getItem("completeList") || "";
    attachTaskEventListeners(todoList);
    attachTaskEventListeners(completeList);
  };

  const attachTaskEventListeners = (list) => {
    list.querySelectorAll("li").forEach((task) => {
      task.addEventListener("click", () => {
        task.classList.toggle("selected");
      });
    });
  };

  // adding a task
  const addTask = () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
      const tasks = Array.from(todoList.children).map(
        (task) => task.textContent
      );
      const tasks2 = Array.from(completeList.children).map(
        (task) => task.textContent
      );

      if (tasks.includes(taskName)) {
        showToasterForMove("Task already exists !");
      } else if (tasks2.includes(taskName)) {
        const taskToMove = Array.from(completeList.children).find(
          (task) => task.textContent === taskName
        );
        if (taskToMove) {
          completeList.removeChild(taskToMove);
          todoList.appendChild(taskToMove);
          showToasterForMove("Task moved to To-Do list!");
          saveTasks();
        }
      } else {
        const task = document.createElement("li");
        task.textContent = taskName;
        task.addEventListener("click", () => {
          task.classList.toggle("selected");
        });
        todoList.appendChild(task);
        lastAction = { type: "add", task }; // Track the addition
        lastAddedTask = task;
        showToasterForMove("Task added to To-Do list!");
        saveTasks();
      }
      taskInput.value = "";
    }
  };

  // moving task from todo-complete or complete - todo
  const moveTasks = (fromList, toList, message) => {
    const selectedTasks = Array.from(fromList.querySelectorAll(".selected"));
    selectedTasks.forEach((task) => {
      task.classList.remove("selected");
      toList.appendChild(task);
    });
    if (selectedTasks.length > 0) {
      lastAction = { type: "move", tasks: selectedTasks, fromList, toList }; // Track the move
      lastMovedTasks = selectedTasks;
      showToasterForMove(message);
    }
    saveTasks();
  };

  // remove the selcected task
  const removeSelectedTasks = (list) => {
    const selectedTasks = Array.from(list.querySelectorAll(".selected"));
    if (selectedTasks.length > 0) {
      lastAction = { type: "remove", tasks: selectedTasks, list }; // Track the removal
      lastRemovedTasks = selectedTasks.map((task) => ({
        content: task.textContent,
        list: list.id,
        taskElement: task,
      }));
      selectedTasks.forEach((task) => task.remove());
      showToaster("Selected tasks removed!");
    }
    saveTasks();
  };

  // undo section
  const undoLastAction = () => {
    if (lastAction) {
      suppressToaster = true; // Suppress toaster during undo
      if (lastAction.type === "remove") {
        lastRemovedTasks.forEach(({ content, list }) => {
          const task = document.createElement("li");
          task.textContent = content;
          task.addEventListener("click", () => {
            task.classList.toggle("selected");
          });
          document.getElementById(list).appendChild(task);
        });
      } else if (lastAction.type === "add") {
        lastAddedTask.remove();
      } else if (lastAction.type === "move") {
        lastAction.tasks.forEach((task) => {
          lastAction.fromList.appendChild(task);
        });
      }

      suppressToaster = false; // Re-enable toaster messages

      // Show success message without undo button
      toasterMessage.textContent = "Undo successful!";
      toaster.classList.remove("hidden");
      undoButton.classList.add("hidden1"); // Hide the undo button

      setTimeout(() => {
        toaster.classList.add("hidden"); // Hide the toaster after 3 seconds
      }, 3000);

      // Clear the last action
      lastAction = null;
      lastRemovedTasks = [];
      lastMovedTasks = [];
      lastAddedTask = null;

      saveTasks();
    }
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
    moveTasks(todoList, completeList, "Tasks moved to Completed list!");
  });

  // Event listener for the "Move to To-Do" button
  moveLeftButton.addEventListener("click", () => {
    moveTasks(completeList, todoList, "Tasks moved to To-Do list!");
  });

  undoButton.addEventListener("click", undoLastAction);

  updateButtonLabels();

  // Event listener for window resize to adjust button labels dynamically
  window.addEventListener("resize", updateButtonLabels);

  loadTasks();
});
