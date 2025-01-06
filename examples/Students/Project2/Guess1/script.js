// Variables
let history = [];
let playername = '';
let attempts = 0;
let targetNumber = null;
let userGuess = '';
let message = '';
let guessHistory = [];
let timeLeft = 30;
let gameOver = false;
let startTime = null;
let timer;

// Initialize elements
const playerInput = document.getElementById('playername');
const startGameBtn = document.getElementById('start-game-btn');
const displayPlayer = document.getElementById('display-player');
const messageDisplay = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const timeLeftDisplay = document.getElementById('time-left');
const userGuessInput = document.getElementById('user-guess');
const submitGuessBtn = document.getElementById('submit-guess-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const historySection = document.getElementById('history-section');
const guessHistoryDisplay = document.getElementById('guess-history');

// Generate a random number between 1 and 100
function generateTargetNumber() {
  targetNumber = Math.floor(Math.random() * 100) + 1;
}

// Start game
startGameBtn.onclick = function () {
  if (!playerInput.value) {
    alert('Please enter a player name!');
    return;
  }

  playername = playerInput.value;
  displayPlayer.textContent = playername;
  attempts = 0;
  message = '';
  userGuess = '';
  guessHistory = [];
  gameOver = false;
  timeLeft = 30;
  startTime = new Date();

  generateTargetNumber();
  updateGameDisplay();
  startTimer();
  document.getElementById('start-form').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';
};

// Handle submit guess
submitGuessBtn.onclick = function () {
  if (gameOver || userGuessInput.value === '') return;

  userGuess = parseInt(userGuessInput.value);
  attempts++;
  const currentTime = new Date().toLocaleString();
  guessHistory.push(`Guess: ${userGuess} - Time: ${currentTime}`);

  if (userGuess < targetNumber) {
    message = 'Too low! Try again.';
  } else if (userGuess > targetNumber) {
    message = 'Too high! Try again.';
  } else {
    const timeTaken = 30 - timeLeft;
    message = `Correct! The number was ${targetNumber}. You took ${timeTaken} seconds.`;
    recordHistory(timeTaken);
    gameOver = true;
    clearInterval(timer);
  }

  updateGameDisplay();
};

// Update game display
function updateGameDisplay() {
  messageDisplay.textContent = message;
  attemptsDisplay.textContent = attempts;
  timeLeftDisplay.textContent = timeLeft;

  guessHistoryDisplay.innerHTML = guessHistory
    .map((guess) => `<p>${guess}</p>`)
    .join('');
}

// Start countdown timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      message = "Time's up! You lost.";
      gameOver = true;
      updateGameDisplay();
    }
  }, 1000);
}

// Record game history
function recordHistory(timeTaken) {
  const playTime = new Date().toLocaleString();
  history.push({
    name: playername,
    time: playTime,
    attempts: attempts,
    timeTaken: timeTaken,
  });
  renderHistory();
}

// Render game history
function renderHistory() {
  const sortedHistory = history.sort((a, b) => a.timeTaken - b.timeTaken);
  historySection.innerHTML = `
    <h2>Game History</h2>
    <button onclick="clearHistory()">Clear All History</button>
    ${sortedHistory
      .map(
        (record, index) =>
          `<div class="history-item">
            <p>${record.name} played at ${record.time} - Attempts: ${record.attempts} - Time Taken: ${record.timeTaken} seconds
            <button onclick="deleteRecord(${index})">Delete</button></p>
          </div>`
      )
      .join('')}
  `;
}

// Clear game history
function clearHistory() {
  history = [];
  renderHistory();
}

// Delete a specific record
function deleteRecord(index) {
  history.splice(index, 1);
  renderHistory();
}

// Try again function
tryAgainBtn.onclick = function () {
  clearInterval(timer);
  document.getElementById('start-form').style.display = 'block';
  document.getElementById('game-section').style.display = 'none';
};
