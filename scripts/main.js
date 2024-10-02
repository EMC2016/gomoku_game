
//Setup heading words
const myHeading = document.querySelector("h1");
myHeading.textContent = "Gomoku World";

//Set user name on event 'login'
let loginbutton = document.getElementById('login');
loginbutton.onclick = () => {
    setUserName();
  };


//Restart game on event 'restart'
let restartbutton = document.getElementById('restart');
let gameover = false;
restartbutton.onclick = () =>{
  restartGame();
};


//**START GAME */
// Variables to track game state
let currentPlayer = 'black'; // Start with black
let boardState = []; // Store the state of the board
let winner = 'null';

// Select necessary DOM elements
const chessboard = document.getElementById('chessboard');
const currentPlayerElement = document.getElementById('currentPlayer');

// Initialize board state
const boardSize = 19;
const gridSpacing = (chessboard.clientWidth -270.5) / (boardSize-1) ;
for (let i = 0; i < boardSize; i++) {
    boardState[i] = Array(boardSize).fill(null);
}


// Initial time in seconds (10 minutes)
let initialTime = 600;

// Player times
let player1Time = initialTime;
let player2Time = initialTime;


// Interval IDs for timers
let player1Interval = null;
let player2Interval = null;

// HTML elements
const player1TimeDisplay = document.getElementById('player1-time');
const player2TimeDisplay = document.getElementById('player2-time');
const player1TimerDiv = document.getElementById('black-timer');
const player2TimerDiv = document.getElementById('white-timer');

// Update the initial time displays
player1TimeDisplay.textContent = formatTime(player1Time);
player2TimeDisplay.textContent = formatTime(player2Time);


//Start game on event 'restart'
let startbutton = document.getElementById('start');

startbutton.onclick = () =>{
  alert("Game is to begin! Black first.");

  startPlayerTimer(currentPlayer);
};


// Calculate the postion point on event 'click'
chessboard.addEventListener('click', (event) => {

    // Check if game is over
    if(gameover){
      alert("Game is over! Winner is "+winner.charAt(0).toUpperCase() + winner.slice(1)+"!");
      return;
    }
    const rect = chessboard.getBoundingClientRect();
    const x = event.clientX - rect.left-135.5;
    const y = event.clientY - rect.top-34;
    
    // Find the nearest grid position
    const gridX = Math.round(x / gridSpacing);
    const gridY = Math.round(y / gridSpacing);
    
    
     // Check if the position is already occupied
    if (boardState[gridX][gridY] === null ) {
        placeStone(gridX, gridY);
        console.log("Place the stone.");

        if(!checkWinner(gridX,gridY)){
          console.log("Toggle the player.");
          togglePlayer();
        }
    }else{
        alert("This grid is occupied! Try again.");
    }
});

//Function to set user name
function setUserName() {
  const myName = prompt("Please enter your name.");
  localStorage.setItem("name", myName);
  myHeading.textContent = `Gomoku is cool, ${myName}`;
}

// Function to place a stone at a given grid position
function placeStone(gridX, gridY) {
    const stone = document.createElement('img');
    stone.classList.add('stone');
    stone.src = currentPlayer === 'white' ? 'images/whitestone.png' : 'images/blackstone.png';
    stone.style.left = `${(gridX) * gridSpacing + 135.5}px`;
    stone.style.top = `${(gridY) * gridSpacing + 34}px`;

    chessboard.appendChild(stone);

    // Update the board state
    boardState[gridX][gridY] = currentPlayer;
    
}

// Function to toggle the player's turn
function togglePlayer() {
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    currentPlayerElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
    highlightCurrentPlayer(currentPlayer);
    startPlayerTimer(currentPlayer);
    console.log(currentPlayer);
}

  
// Function to check the current player win or not
function checkWinner(gridX,gridY) {
  let count = 1;
  let x = gridX-1;
  let y = gridY;
  while(x>=0 && boardState[x][y]==currentPlayer){
      count++;
      x--;
  }
  x = gridX+1;
  while(x<boardSize && boardState[x][y]==currentPlayer){
      count++;
      x++;
  }

  if(count >= 5){
    endGame();
    winner = currentPlayer;
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return gameover;
  }

  count = 1;
  x = gridX;  
  y = gridY-1;
  while(y>=0 && boardState[x][y]==currentPlayer){
      count++;
      y--;
  }
    y = gridY+1;
  while(y<boardSize && boardState[x][y]==currentPlayer){
      count++;
      y++;
  }
  if(count >= 5){
    endGame();
    winner = currentPlayer;
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return gameover;
  }

  count = 1;
  x = gridX-1;  
  y = gridY-1;

  while(x>=0 && y>=0 && boardState[x][y]==currentPlayer){
      count++;
      y--;
      x--;
  }

  x = gridX+1;  
  y = gridY+1;
  while(x<boardSize && y<boardSize && boardState[x][y]==currentPlayer){
      count++;
      y++;
      x++;
   
  }
  if(count >= 5){
    endGame();
    winner = currentPlayer;
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return gameover;
  }

  count = 1;
  x = gridX-1;  
  y = gridY+1;

  while(x>=0 && y<boardSize && boardState[x][y]==currentPlayer){
      count++;
      y++;
      x--;
  }
  x = gridX+1;  
  y = gridY-1;
  while(x<boardSize && y>=0 && boardState[x][y]==currentPlayer){
      count++;
      y--;
      x++;
  }
  
  if(count >= 5){
    endGame();
    winner = currentPlayer;
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return gameover;
  }

  return gameover;

}

// Set status to initial status, restart the game
function restartGame(){
  gameover = false;
  winner = 'null';
  currentPlayer = 'black';
  for (let i = 0; i < boardSize; i++) {
    boardState[i] = Array(boardSize).fill(null);
  }
  document.getElementById('currentPlayer').textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
  
  const stones = document.querySelectorAll('.stone');
  stones.forEach(stone => stone.remove());
  player1Time = initialTime;
  player2Time = initialTime;
  player1TimeDisplay.textContent = formatTime(player1Time);
  player2TimeDisplay.textContent = formatTime(player2Time);

  alert("Game is to restart! Black first.");
  startPlayerTimer(currentPlayer);
  console.log("Restart the game.");

}


// Function to format time in MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to start the timer for the current player
function startPlayerTimer(player) {
  stopAllTimers(); // Ensure other timers are stopped

  if (player === "black") {
      highlightCurrentPlayer(player);

      player1Interval = setInterval(() => {
          player1Time--;
          player1TimeDisplay.textContent = formatTime(player1Time);

          if (player1Time <= 0) {
              clearInterval(player1Interval);
              winner = 'white';
              alert('Black has run out of time. White wins!');
              endGame();
          }
      }, 1000);
  } else{
      highlightCurrentPlayer(player);

      player2Interval = setInterval(() => {
          player2Time--;
          player2TimeDisplay.textContent = formatTime(player2Time);

          if (player2Time <= 0) {
              clearInterval(player2Interval);
              winner = 'black';
              alert('White has run out of time. Black wins!');
              endGame();
          }
      }, 1000);
  }
}

// Function to stop all timers
function stopAllTimers() {
  clearInterval(player1Interval);
  clearInterval(player2Interval);
  player1Interval = null;
  player2Interval = null;
}

// Function to highlight the current player
function highlightCurrentPlayer(player) {
  if (player === 'black') {
      player1TimerDiv.classList.add('current-player');
      player2TimerDiv.classList.remove('current-player');
  } else {
      player2TimerDiv.classList.add('current-player');
      player1TimerDiv.classList.remove('current-player');
  }
}


// Function to handle game end
function endGame() {
  gameover = true;
  console.log(winner);
  stopAllTimers();
  
}

