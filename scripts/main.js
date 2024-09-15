
//const myHeading = document.querySelector("h1");
//myHeading.textContent = "Gomoku World";


//document.querySelector("html").addEventListener("click", function () {
//    alert("Ouch! Stop poking me!");
//  });

/*
const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/chessboard.jpg") {
    myImage.setAttribute("src", "images/chessboard_2.jpg");
  } else {
    myImage.setAttribute("src", "images/chessboard_1.webp");
  }
};
*/

let myButton = document.querySelector("button");

myButton.onclick = () => {
    setUserName();
  };

function setUserName() {
    const myName = prompt("Please enter your name.");
    localStorage.setItem("name", myName);
    myHeading.textContent = `Gomoku is cool, ${myName}`;
  }



  // Variables to track game state
let currentPlayer = 'white'; // Start with black
let boardState = []; // Store the state of the board

// Select necessary DOM elements
const chessboard = document.getElementById('chessboard');
const currentPlayerElement = document.getElementById('currentPlayer');

// Initialize board state
const boardSize = 19;
const gridSpacing = chessboard.clientWidth / boardSize;
for (let i = 0; i < boardSize; i++) {
    boardState[i] = Array(boardSize).fill(null);
}

// Calculate the postion point that near the click
//**RECALCULATE THE POSITION */
chessboard.addEventListener('click', (event) => {
    const rect = chessboard.getBoundingClientRect();
    const x = event.clientX - rect.left - 63.77*800/2326.7715;
    const y = event.clientY - rect.top - 63.77*800/2326.7715;
    console.log('rect.left:', rect.left);
    console.log('rect.top:', rect.top); 
    console.log('gridSpacing:', gridSpacing);
    console.log('totalWidth:', chessboard.clientWidth);
   
    // Find the nearest grid position
    const gridX = Math.floor(x / gridSpacing);
    const gridY = Math.floor(y / gridSpacing);

    // Check if the position is already occupied
    if (boardState[gridX][gridY] === null) {
        placeStone(gridX, gridY);
        togglePlayer();
    }
});

// Function to place a stone at a given grid position
function placeStone(gridX, gridY) {
    const stone = document.createElement('img');
    stone.classList.add('stone');
    stone.src = currentPlayer === 'white' ? 'images/whitestone.png' : 'images/blackstone.png';
    stone.style.left = `${(gridX + 0.5) * gridSpacing}px`;
    stone.style.top = `${(gridY + 0.5) * gridSpacing}px`;

    chessboard.appendChild(stone);

    // Update the board state
    boardState[gridX][gridY] = currentPlayer;
}

// Function to toggle the player's turn
function togglePlayer() {
    currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
    currentPlayerElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
}

  