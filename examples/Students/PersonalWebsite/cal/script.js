let display = '';
let result = null;

function handlePress(value) {
    if (result !== null && !isNaN(value)) {
        display = value;
        result = null;
        updateDisplay();
    } else if (value === '=') {
        calculateResult();
    } else if (value === 'C') {
        display = '';
        result = null;
        updateDisplay();
    } else {
        display += value;
        updateDisplay();
    }
}

function calculateResult() {
    try {
        result = eval(display);
        updateDisplay();
    } catch (error) {
        result = 'Error';
        updateDisplay();
    }
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    const resultElement = document.getElementById('result');
    
    displayElement.textContent = display;
    resultElement.textContent = result !== null ? `= ${result}` : '';
}
