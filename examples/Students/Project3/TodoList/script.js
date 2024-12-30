// Initialize state variables
const history = [];
const taskInput = document.getElementById('task-input');
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');
const clearHistoryButton = document.getElementById('clear-history');

// Handle form submission
document.getElementById('task-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const playerName = taskInput.value.trim();
  if (playerName !== '') {
    recordHistory(playerName);
    taskInput.value = '';
  }
});

// Function to record a new history entry
function recordHistory(name) {
  const playTime = new Date().toLocaleString();
  const newRecord = {
    name,
    time: playTime
  };
  history.push(newRecord);
  renderHistory();
}

// Function to render the history list
function renderHistory() {
  if (history.length === 0) {
    historySection.style.display = 'none';
    return;
  }

  historySection.style.display = 'block';
  historyList.innerHTML = ''; // Clear previous content

  history.forEach((record, index) => {
    const recordElement = document.createElement('p');
    recordElement.textContent = `${record.name} created at ${record.time}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => deleteRecord(index));

    recordElement.appendChild(deleteButton);
    historyList.appendChild(recordElement);
  });
}

// Function to delete a specific record
function deleteRecord(index) {
  history.splice(index, 1);
  renderHistory();
}

// Function to clear all history
clearHistoryButton.addEventListener('click', () => {
  history.length = 0;
  renderHistory();
});
