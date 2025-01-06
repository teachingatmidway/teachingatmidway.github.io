let animalList = {
    Bear: "Bears can hibernate up to seven months!",
    Flamingo: "Flamingoes are born with gray feathers!",
    Cheetah: "Cheetahs can race up to 70 mph!",
    Dolphin: "Dolphins use sonar to navigate!",
    Panda: "99% of a panda's diet is bamboo!",
    Turtle: "Turtle's existed over 200 million years ago!",
    Giraffe: "Giraffe's only drink once every few days!",
    Tiger: "Tigers are the largest cat in the world!"
};
let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let clickCount=0;        // Track click frequency
let totalRotation=0;      // Accumulate total rotation angle
// Function to handle the spin button click
function handleSpinClick() {
    clickCount++;//?
    // Calculate the rotation angle and speed based on the click count
    let additionalRotation = 720 + clickCount * 100; // Increases rotation with each click
    totalRotation += additionalRotation;             // Accumulate total rotation in one direction
    let speedFactor = Math.max(1, 5 - clickCount * 0.5); // Decrease duration as clicks increase
    wheel.style.transition = "transform " + speedFactor + "s ease-in-out";
    wheel.style.transform = "rotate(" + totalRotation + "deg)";
    resetClickCount(speedFactor);// Reset click count after the spin is complete
}
// Function to reset click count after the spin
function resetClickCount(speedFactor) {
    setTimeout(resetCount, speedFactor * 1000);
}
// Function to actually reset click count
function resetCount() {
    clickCount = 0;
}
// Function to handle transition end
function handleTransitionEnd() {
    let numbers = document.querySelectorAll('.number');
    let topMostIndex = -1;
    let topMostPosition = Number.POSITIVE_INFINITY;
    numbers.forEach(findTopMostNumber);
    function findTopMostNumber(number, index) {
        let position = number.getBoundingClientRect().top;
        if (position<topMostPosition) {
            topMostIndex = index;
            topMostPosition = position;
        }
    }
    let topMostAnimal = numbers[topMostIndex].querySelector("span").innerText;
    let animalMessage = animalList[topMostAnimal];
    // Display the selected color and psychology directly on the page
    let h1Element = document.getElementById("headMessage");
    let message="Selected Animal: " + topMostAnimal + "\n\nFun Fact: " + animalMessage;//?
    h1Element.innerText = message;
}
// Attach event listeners
spinBtn.onclick = handleSpinClick;
wheel.addEventListener("transitionend", handleTransitionEnd);