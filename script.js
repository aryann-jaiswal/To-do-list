 // script.js

// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim(); // Get input value

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.textContent = taskText;

  // Add buttons to mark complete and delete
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Done';
  completeBtn.addEventListener('click', () => li.classList.toggle('completed'));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => taskList.removeChild(li));

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = ''; // Clear input field
}

// Save task list to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
      tasks.push({
        text: li.textContent.replace('DoneDelete', '').trim(),
        completed: li.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) li.classList.add('completed');
      taskList.appendChild(li);
    });
  }
  
  // Call loadTasks on page load
  loadTasks();
  
  // Update saveTasks in event listeners
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });
  
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    saveTasks();
  });
  