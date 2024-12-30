function handleCreateClick(event) {
  event.preventDefault() //Stop the default action of an event from occurring. 
  
  // Update business card with input values
  document.getElementById("name").textContent = document.getElementById("InputName").value; 
  
  document.getElementById("job-title").textContent = document.getElementById("InputJob").value; 

  document.getElementById("phone").textContent = document.getElementById("InputPhone").value; 

  document.getElementById("email").textContent = document.getElementById("InputMail").value; 
  
  const emailValue = document.getElementById("InputMail").value;
  document.getElementById("email").innerHTML = `<a href="mailto:${emailValue}">${emailValue}</a>`;
}

function handleBlueClick(event) {
    event.preventDefault() //Stop the default action of an event from occurring. 
	const bizCard = document.querySelector(".biz-card");
	bizCard.classList.toggle("blue"); // color
}

function handleYellowClick(event) {
    event.preventDefault() //Stop the default action of an event from occurring. 
  const bizCard = document.querySelector(".biz-card");
  bizCard.classList.toggle("yellow"); // color
}

function handleGrayClick(event) {
    event.preventDefault() //Stop the default action of an event from occurring. 
  const bizCard = document.querySelector(".biz-card");
  bizCard.classList.toggle("gray"); // color
}

function handleGreenClick(event) {
    event.preventDefault() //Stop the default action of an event from occurring. 
  const bizCard = document.querySelector(".biz-card");
  bizCard.classList.toggle("green"); // color
}

function handlePinkClick(event) {
    event.preventDefault() //Stop the default action of an event from occurring. 
  const bizCard = document.querySelector(".biz-card");
  bizCard.classList.toggle("pink"); // color
}

function handleDefaultClick(event) {
    event.preventDefault() //Stop the default action of an event from occurring. 
  const bizCard = document.querySelector(".biz-card");
  bizCard.classList.toggle("default"); // color
}

function handleFormEvents() {
  // Event listener for the Create button
  document.getElementById("submitCreate").addEventListener("click", handleCreateClick);

  // Event listener for the Blue button
  document.querySelector("button.blue").addEventListener("click", handleBlueClick);

  // Event listener for the Yellow button
  document.querySelector("button.yellow").addEventListener("click", handleYellowClick);
  
    // Event listener for the Yellow button
  document.querySelector("button.gray").addEventListener("click", handleGrayClick);
  
    // Event listener for the Yellow button
  document.querySelector("button.green").addEventListener("click", handleGreenClick);
  
    // Event listener for the Yellow button
  document.querySelector("button.pink").addEventListener("click", handlePinkClick);
}

//const emailValue = document.getElementById("InputMail").value;
//document.getElementById("email").innerHTML = `<a href="mailto:${emailValue}">${emailValue}</a>`;

// Call the function to handle form events
handleFormEvents();
