const spanPlayer = document.querySelector('.player');
const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
//Add sound related statement
const soundActive = document.getElementById('soundActive');

const characters = [
  'beth',
  'jerry',
  //'jessica',
  'albert',
  //'morty',
  //'pessoa-passaro',
  //'pickle-rick',
  //'rick',
  //'summer',
  //'meeseeks',
  //'scroopy',
];


let firstCard = '';
let secondCard = '';
let matchCount = 0; // Initialize a match counter at the start of the game

const createElement=(tag,className)=>{
	const element=document.createElement(tag);
	element.className=className;
	return element;
};

const createCard=(characters)=>{
	const card=createElement('div','card');
	const back=createElement('div','face back');
	const front=createElement('div','face front');
	
	front.style.backgroundImage=`url('../images/${characters}.png')`;
	card.appendChild(front);
	card.appendChild(back);
	
	card.addEventListener('click', revealCard);
	card.setAttribute('data-character', characters);
	return card;
};






const checkEndGame = () => {
  if (matchCount === 2*characters.length) {
    clearInterval(this.loop); // Stop the timer
	alert('Congratulations! You completed the game!');
	hideCards(); // Hide cards after clicking OK
    showFireworks(); // Trigger fireworks effect
  }
}

const hideCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.visibility = 'hidden'; // Hide each card by setting visibility to hidden
  });
}

const showFireworks = () => {
  const canvas = document.createElement('canvas');
  canvas.className = 'fireworks-canvas';
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  const fireworks = [];

  // Create a fireworks particle
  function createFirework(x, y) {
    const particles = [];
    const numParticles = 100;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: x,
        y: y,
        dx: Math.random() * 4 - 2,
        dy: Math.random() * 4 - 2,
        size: Math.random() * 2 + 1,
        life: Math.random() * 60 + 60,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      });
    }
    return particles;
  }

  function updateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach((firework, index) => {
      firework.forEach((particle, i) => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.size *= 0.999; // Gradually shrink
        particle.life -= 1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        if (particle.life <= 0) {
          firework.splice(i, 1);
        }
      });
      if (firework.length === 0) {
        fireworks.splice(index, 1);
      }
    });

    // Randomly create new fireworks
    if (Math.random() < 0.1) {
      fireworks.push(createFirework(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    requestAnimationFrame(updateFireworks);
  }

  updateFireworks();

  // Stop the fireworks after 10 seconds
  setTimeout(() => {
    fireworks.length = 0; // Clear the fireworks array
    canvas.remove(); // Remove the canvas from the DOM
	location.reload(); // Refresh the page
  }, 30000); // 10 seconds
};


const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    // Special case for "albert"
    if (firstCharacter === 'albert') {
      playAlbertVideo(firstCard);
      playAlbertVideo(secondCard);
	 setTimeout(() => {
	
		firstCard.firstChild.classList.add('disabled-card');
		secondCard.firstChild.classList.add('disabled-card');

		// Increase match count when a pair is found
		matchCount += 2;

		firstCard = '';
		secondCard = '';

		// Add a slight delay before checking if the game is over
		setTimeout(() => {
		checkEndGame();
		}, 	300); // Adjust delay as needed
		}, 14000);
    } else{


	
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    // Increase match count when a pair is found
    matchCount += 2;

    firstCard = '';
    secondCard = '';

    // Add a slight delay before checking if the game is over
    setTimeout(() => {
      checkEndGame();
    }, 300); // Adjust delay as needed
	}
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
};


/* add animations */
const playAlbertVideo = (card) => {
  const frontFace = card.querySelector('.front');
  if (frontFace) {
	const originalImage = frontFace.style.backgroundImage;
	
    // Replace the content of the front face with the video
    frontFace.innerHTML = `
      <div class="radiant-light" style="width: 100%; height: 100%; border-radius: inherit; overflow: hidden;">
        <video autoplay style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">
          <source src="../videos/abin.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>`;

    // Play the video with sound
    const videoElement = frontFace.querySelector('video');
    videoElement.play().catch((error) => {
      console.error("Video playback failed:", error);
    });

    // Stop the timer when the video starts
    clearInterval(this.loop);
	
    // Remove the glowing effect when the video ends
    videoElement.addEventListener('ended', () => {
      const glowContainer = frontFace.querySelector('.radiant-light');
      if (glowContainer) {
        glowContainer.classList.remove('radiant-light');
      }
	  
	  // Restore the original background image
	  frontFace.innerHTML ='';
      frontFace.style.backgroundImage = originalImage;
	  
      // Resume the timer
      startTimer();
    });
  }
};




const revealCard = ({ target }) => {
	
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
	soundActive.play(); // Play sound when first card is revealed
  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
	
    // Play sound with a slight delay for the second card
    setTimeout(() => {
      soundActive.play(); // Play sound when second card is revealed
    }, 200); // Delay for sound playback
	
	checkCards();
  }
};




const loadGame=()=>{
	const repeatedCards=[...characters,...characters];
	const shuffledArray = repeatedCards.sort(() => Math.random() - 0.5);
	
	shuffledArray.forEach((characters)=>{
	const card=createCard(characters);
	grid.appendChild(card);
	});
};

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  speakAddress("Welcome to memeory game!"+localStorage.getItem('player'));
	loadGame();
	startTimer();
};


// Function to speak the address (text)
function speakAddress(address) {
	if ('speechSynthesis' in window) {
		var speech = new SpeechSynthesisUtterance(address);
		speech.lang = 'en-US'; // Set the language to English
		window.speechSynthesis.speak(speech);
		} else {
		console.log("Speech synthesis not supported in this browser.");
    }
}
