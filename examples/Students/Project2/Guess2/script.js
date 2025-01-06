document.addEventListener('DOMContentLoaded', () => {
  const targetNumber = Math.floor(Math.random() * 100) + 1;
  let guess = "";
  let attempts = 0;
  let gameOver = false;
  const history = [];

  const userGuessInput = document.getElementById('userGuess');
  const guessButton = document.getElementById('guessButton');
  const feedback = document.getElementById('feedback');
  const attemptsText = document.getElementById('attempts');
  const resetButton = document.getElementById('resetButton');
  const historySection = document.getElementById('history-section');
  const historyRecords = document.getElementById('history-records');
  const clearHistoryButton = document.getElementById('clearHistory');

  const handleGuess = () => {
    if (gameOver) return;
    guess = parseInt(userGuessInput.value, 10);
    attempts += 1;
    attemptsText.textContent = `Attempts: ${attempts}`;

    if (guess === targetNumber) {
      feedback.textContent = "Correct! You guessed the number!";
      gameOver = true;
      resetButton.style.display = 'inline-block';
      recordHistory(attempts);
      showConfetti();
    } else if (guess > targetNumber) {
      feedback.textContent = "Too high! Try again.";
    } else {
      feedback.textContent = "Too low! Try again.";
    }
    userGuessInput.value = '';
  };

  const resetGame = () => {
    guess = "";
    feedback.textContent = "Enter a Guess to Start";
    attempts = 0;
    gameOver = false;
    attemptsText.textContent = "Attempts: 0";
    resetButton.style.display = 'none';
    historySection.style.display = history.length > 0 ? 'block' : 'none';
  };

  const recordHistory = (attemptCount) => {
    const playTime = new Date().toLocaleString();
    const newRecord = {
      attempts: attemptCount,
      time: playTime
    };
    history.push(newRecord);
    updateHistoryDisplay();
  };

  const updateHistoryDisplay = () => {
    historyRecords.innerHTML = '';
    history.forEach((record, index) => {
      const recordElement = document.createElement('p');
      recordElement.innerHTML = `Game played at ${record.time} - Attempts: ${record.attempts}
      <button class="delete-button" onclick="deleteRecord(${index})">Delete</button>`;
      historyRecords.appendChild(recordElement);
    });
    historySection.style.display = 'block';
  };

  const deleteRecord = (index) => {
    history.splice(index, 1);
    updateHistoryDisplay();
  };

  const showConfetti = () => {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = "";
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.setProperty('--random-x', `${Math.random() * 100}vw`);
      piece.style.setProperty('--random-delay', `${Math.random()}s`);
      confettiContainer.appendChild(piece);
    }
  };

  guessButton.addEventListener('click', handleGuess);
  resetButton.addEventListener('click', resetGame);
  clearHistoryButton.addEventListener('click', () => {
    history.length = 0;
    updateHistoryDisplay();
  });
});
