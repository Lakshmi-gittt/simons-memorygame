const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let round = 0;
let acceptingInput = false;

const buttons = document.querySelectorAll('.btn');
const startButton = document.getElementById('start-btn');
const status = document.getElementById('status');

// Load sound files
const sounds = {
  red: new Audio('sound/red.mp3.wav'),
  green: new Audio('sound/red.mp3.wav'),
  blue: new Audio('sound/blue.mp3.wav'),
  yellow: new Audio('sound/blue.mp3.wav')
};

// Flash + play sound
function flash(color) {
  const btn = document.querySelector(`.btn.${color}`);
  btn.classList.add('flash');
  playSound(color);
  setTimeout(() => btn.classList.remove('flash'), 400);
}

// Play associated sound
function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0;
    sounds[color].play();
  }
}

// Show sequence to player
async function playPattern() {
  acceptingInput = false;
  status.textContent = `Round ${round}`;
  for (let color of sequence) {
    flash(color);
    await new Promise(res => setTimeout(res, 600));
  }
  acceptingInput = true;
}

// Add next color to pattern
function nextRound() {
  playerSequence = [];
  round++;
  const nextColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(nextColor);
  playPattern();
}

// Handle player input
function handleClick(e) {
  if (!acceptingInput) return;
  const color = e.target.dataset.color;
  flash(color);
  playerSequence.push(color);

  const index = playerSequence.length - 1;
  if (playerSequence[index] !== sequence[index]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(() => nextRound(), 1000);
  }
}

// Start game
function startGame() {
  sequence = [];
  playerSequence = [];
  round = 0;
  status.textContent = 'Game Started!';
  nextRound();
}

// Game over
function gameOver() {
  acceptingInput = false;
  status.textContent = `Game Over! You reached round ${round}. Click Start to play again.`;
}

buttons.forEach(btn => btn.addEventListener('click', handleClick));
startButton.addEventListener('click', startGame);
