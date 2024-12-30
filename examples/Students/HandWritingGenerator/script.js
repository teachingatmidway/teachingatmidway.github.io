function generateHandwriting() {
    const inputText = document.getElementById("inputText").value;
    const outputText = document.getElementById("outputText");
    outputText.innerText = inputText;

    const outputContainer = document.querySelector('.output-container');
    
    // Immediately remove the 'visible' class to reset the animation
    outputContainer.classList.remove('visible');

    // Trigger reflow to reset the transition (necessary in some browsers)
    void outputContainer.offsetWidth; 

    // Add the 'visible' class after a short delay to trigger the transition
    setTimeout(() => {
        outputContainer.classList.add('visible');
    }, 10); // Slight delay to allow CSS to reset
}
function changeBackground() {
    const backgroundSelect = document.getElementById("backgroundSelect").value;
    const outputContainer = document.querySelector('.output-container');

    switch (backgroundSelect) {
        case "notebook1":
            outputContainer.style.backgroundImage = "url('notebook1.jpg')";
            break;
        case "notebook2":
            outputContainer.style.backgroundImage = "url('notebook_background.jpg')";
            break;
        case "oldbook":
            outputContainer.style.backgroundImage = "url('oldbook.jpg')";
            break;
        case "Rain":
            outputContainer.style.backgroundImage = "url('rain.gif')";
            break;
        case "Select background":
        default:
            outputContainer.style.backgroundImage = "none";
            break;
    }
}

function changeFont() {
    const fontSelect = document.getElementById("fontSelect").value;
    const outputText = document.getElementById("outputText");
    outputText.style.fontFamily = fontSelect; 
}

function changeTextColor() {
    const textColor = document.getElementById("textColorSelect").value;
    const outputText = document.getElementById("outputText");
    outputText.style.color = textColor;
}

function downloadImage() {
    const outputText = document.getElementById("outputText");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = outputText.offsetWidth;
    canvas.height = outputText.offsetHeight;

    // Draw background color
    ctx.fillStyle = "#f9f9f9"; // Use container background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.font = `${window.getComputedStyle(outputText).fontSize} ${window.getComputedStyle(outputText).fontFamily}`;
    ctx.fillStyle = window.getComputedStyle(outputText).color;

    // Handle line breaks
    const text = outputText.innerText;
    const lines = text.split('\n');
    let y = 30; // Starting position for text

    lines.forEach(line => {
        ctx.fillText(line, 10, y);
        y += 30; // Move down for the next line
    });

    // Create download link
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = 'handwriting.png';
    link.click();
}