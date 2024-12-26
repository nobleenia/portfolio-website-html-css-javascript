const grid = document.querySelector('.grid');
const movesElement = document.getElementById('moves');
const timerElement = document.getElementById('timer');
const restartButton = document.getElementById('restart');

let cards = ['🍎', '🍌', '🍇', '🍉', '🍎', '🍌', '🍇', '🍉', '🥑', '🍒', '🥑', '🍒', '🍓', '🍍', '🍓', '🍍'];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer = 0;
let timerInterval;

// Shuffle the cards
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Initialize the game
function initGame() {
  grid.innerHTML = '';
  cards = shuffle(cards);
  matchedCards = 0;
  moves = 0;
  timer = 0;
  flippedCards = [];
  movesElement.textContent = moves;
  timerElement.textContent = `${timer}s`;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = `${timer}s`;
  }, 1000);

  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', flipCard);
    grid.appendChild(cardElement);
  });
}

// Handle game end
function gameOver(moves, time) {
  const popup = document.getElementById("game-end-popup");
  const finalScore = document.getElementById("final-score");
  const playAgainButton = document.getElementById("play-again");
  
  // Update the popup with the final score and message
  finalScore.innerHTML = `You completed the game in <strong>${moves}</strong> moves and <strong>${time}seconds</strong>!`;
  
  // Show the popup
  popup.classList.remove("hidden");
  
  // Restart the game when "Play Again" is clicked
  playAgainButton.addEventListener("click", () => {
    popup.classList.add("hidden");
    resetGame(); // Assuming you already have a function to restart the game
  });
}
  
// Update your existing game logic to call gameOver when the game ends
function checkGameCompletion() {
  const matchedCards = document.querySelectorAll(".card.matched");
  if (matchedCards.length === totalCards) {
    clearInterval(timerInterval); // Stop the timer
    const finalTime = document.getElementById("timer").textContent.replace("s", "");
    const moves = document.getElementById("moves").textContent;
    gameOver(moves, finalTime);
  }
}

// Restart the game
restartButton.addEventListener('click', initGame);

// Start the game on page load
initGame();


// Flip the card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.card;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesElement.textContent = moves;

      if (flippedCards[0].dataset.card === flippedCards[1].dataset.card) {
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedCards += 2;
        flippedCards = [];
        if (matchedCards === cards.length) {
          clearInterval(timerInterval);
          const finalTime = timer;
          setTimeout(() => gameOver(moves, finalTime), 500);
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.textContent = '';
          });
          flippedCards = [];
        }, 1000);
      }
    }
  }
}