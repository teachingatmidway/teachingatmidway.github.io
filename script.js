const videoElement = document.querySelector('.input_video');
const canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

let img = new Image();
img.src = 'midwaylogo.png';

let imgX, imgY;
let scale = 0.25;
let rotation = 0;

img.onload = () => {
  imgX = canvasElement.width / 2;
  imgY = canvasElement.height / 2;
};

let lastDistance = null;
let lastAngle = null;
let controlPaused = false;
let stillStartTime = null;
const stillThreshold = 0.015;

let showLandmarks = true;
let lastIndexY = null;
let scrollCooldown = false;

const toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', () => {
  showLandmarks = !showLandmarks;
  toggleBtn.textContent = showLandmarks ? '🖐 Show Landmarks' : '🖐 Hide Landmarks';
});

const infoBtn = document.getElementById('infoBtn');
const infoBox = document.getElementById('infoBox');

infoBtn.addEventListener('click', () => {
  const isHidden = infoBox.style.display === 'none';
  infoBox.style.display = isHidden ? 'block' : 'none';
  infoBtn.textContent = isHidden ? '📘 Hide Info' : '📘 Show Info';
});

const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', () => {
  imgX = canvasElement.width / 2;
  imgY = canvasElement.height / 2;
  scale = 0.25;
  rotation = 0;
  
  // Reset text
  infoBox.scrollTop = 0;
  infoBox.style.display = 'none';
  infoBtn.textContent = '📘 Show Info';
});

const hands = new Hands({
  locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => await hands.send({ image: videoElement }),
  width: 640,
  height: 480
});
camera.start();

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function angleBetween(a, b) {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function distanceBetween(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function onResults(results) {
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  ctx.save();
  ctx.scale(-1, 1);
  ctx.drawImage(videoElement, -canvasElement.width, 0, canvasElement.width, canvasElement.height);
  ctx.restore();

  const handsDetected = results.multiHandLandmarks || [];

  for (const landmarks of handsDetected) {
    const mirroredLandmarks = landmarks.map(pt => ({ ...pt, x: 1 - pt.x }));
    if (showLandmarks) {
      drawConnectors(ctx, mirroredLandmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
      drawLandmarks(ctx, mirroredLandmarks, { color: '#FF0000', lineWidth: 2 });
    }
  }

  // One-finger interaction: scroll + buttons only
  if (handsDetected.length >= 1 && handsDetected[0][8]) {
    const indexTip = handsDetected[0][8];
    const screenIndex = {
      x: (1 - indexTip.x) * canvasElement.width,
      y: indexTip.y * canvasElement.height
    };

    const btn1 = toggleBtn.getBoundingClientRect();
    if (
      screenIndex.x >= btn1.left && screenIndex.x <= btn1.right &&
      screenIndex.y >= btn1.top && screenIndex.y <= btn1.bottom
    ) {
      if (!toggleBtn.clickedRecently) {
        toggleBtn.click();
        toggleBtn.clickedRecently = true;
        setTimeout(() => toggleBtn.clickedRecently = false, 1000);
      }
    }

    const btn2 = infoBtn.getBoundingClientRect();
    if (
      screenIndex.x >= btn2.left && screenIndex.x <= btn2.right &&
      screenIndex.y >= btn2.top && screenIndex.y <= btn2.bottom
    ) {
      if (!infoBtn.clickedRecently) {
        infoBtn.click();
        infoBtn.clickedRecently = true;
        setTimeout(() => infoBtn.clickedRecently = false, 1000);
      }
    }

    const btn3 = resetBtn.getBoundingClientRect();
    if (
      screenIndex.x >= btn3.left && screenIndex.x <= btn3.right &&
      screenIndex.y >= btn3.top && screenIndex.y <= btn3.bottom
    ) {
      if (!resetBtn.clickedRecently) {
        resetBtn.click();
        resetBtn.clickedRecently = true;
        setTimeout(() => resetBtn.clickedRecently = false, 1000);
      }
    }

    const infoRect = infoBox.getBoundingClientRect();
    if (
      screenIndex.x >= infoRect.left &&
      screenIndex.x <= infoRect.right &&
      screenIndex.y >= infoRect.top &&
      screenIndex.y <= infoRect.bottom
    ) {
      if (lastIndexY != null && !scrollCooldown) {
        const deltaY = screenIndex.y - lastIndexY;
        infoBox.scrollTop += deltaY * 2;
        scrollCooldown = true;
        setTimeout(() => scrollCooldown = false, 30);
      }
      lastIndexY = screenIndex.y;
    } else {
      lastIndexY = null;
    }
  }

  // Two-hand image control only
  if (
    handsDetected.length === 2 &&
    handsDetected[0][4] && handsDetected[0][8] &&
    handsDetected[1][4] && handsDetected[1][8]
  ) {
    const p1 = midpoint(handsDetected[0][4], handsDetected[0][8]);
    const p2 = midpoint(handsDetected[1][4], handsDetected[1][8]);

    const screenP1 = {
      x: (1 - p1.x) * canvasElement.width,
      y: p1.y * canvasElement.height
    };
    const screenP2 = {
      x: (1 - p2.x) * canvasElement.width,
      y: p2.y * canvasElement.height
    };

    const distance = distanceBetween(screenP1, screenP2);
    const angle = angleBetween(screenP1, screenP2);
    const mid = {
      x: (screenP1.x + screenP2.x) / 2,
      y: (screenP1.y + screenP2.y) / 2
    };

    const movementIsSmall =
      lastDistance !== null &&
      lastAngle !== null &&
      Math.abs(distance - lastDistance) < stillThreshold * canvasElement.width &&
      Math.abs(angle - lastAngle) < stillThreshold * Math.PI;

    if (movementIsSmall) {
      if (!stillStartTime) stillStartTime = Date.now();
      if (Date.now() - stillStartTime > 3000) controlPaused = true;
    } else {
      stillStartTime = null;
      controlPaused = false;
    }

    if (!controlPaused) {
      if (lastDistance && lastAngle != null) {
        scale *= distance / lastDistance;
        rotation += angle - lastAngle;
      }
      imgX = mid.x;
      imgY = mid.y;
    }

    lastDistance = distance;
    lastAngle = angle;
  } else {
    lastDistance = null;
    lastAngle = null;
    stillStartTime = null;
    controlPaused = false;
  }

  ctx.save();
  ctx.translate(imgX, imgY);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.restore();
}
