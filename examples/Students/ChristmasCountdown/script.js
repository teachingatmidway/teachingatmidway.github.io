//Set the date the countdown is going towards
let countdown = new Date("Dec 25, 2024 0:0:0").getTime();

//Adjusted a basic w3 school program for the countdown
function calcTime(){
	let now = new Date().getTime();
	var distance = countdown - now;

  //Calculates the different time values
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //Adjusts the html to display the proper timer
  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  //This is here if someone checks the page after the timer is finished
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}

//Runs window load so the correct time automatically pops up when page opens
window.onload = calcTime();
//So timer keeps adjusting live time
setInterval(calcTime, 1000);