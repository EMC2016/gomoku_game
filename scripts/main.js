
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
let currentPlayer = 'white'; // Start with white
let boardState = []; // Store the state of the board

// Select necessary DOM elements
const chessboard = document.getElementById('chessboard');
const currentPlayerElement = document.getElementById('currentPlayer');

// Initialize board state
const boardSize = 19;
const gridSpacing = (chessboard.clientWidth -270.5) / (boardSize-1) ;
for (let i = 0; i < boardSize; i++) {
    boardState[i] = Array(boardSize).fill(null);
}

// Calculate the postion point that near the click
//**RECALCULATE THE POSITION */
chessboard.addEventListener('click', (event) => {
    const rect = chessboard.getBoundingClientRect();
    const x = event.clientX - rect.left-135.5;
    const y = event.clientY - rect.top-34;
    console.log('rect.left:', rect.left);
    console.log('rect.right:', rect.right);
    console.log('rect.top:', rect.top); 
    //console.log('rect.down:', rect.down); 
    console.log('gridSpacing:', gridSpacing);
    //console.log('totalWidth:', chessboard.clientWidth);
    console.log('event.clientX:', event.clientX);
    console.log('event.clientY:', event.clientY);

   
    // Find the nearest grid position
    const gridX = Math.round(x / gridSpacing);
    const gridY = Math.round(y / gridSpacing);
    console.log('x:', x);
    console.log('y:', y);
    console.log('gridX:', gridX);
    console.log('gridY:', gridY);
    // Check if the position is already occupied
    if (boardState[gridX][gridY] === null) {
        placeStone(gridX, gridY);
        if(!checkWinner(gridX,gridY)){
          togglePlayer();
        }
        
    }else{
        alert("This grid is occupied! Try again.");
    }
});

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
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    currentPlayerElement.textContent = currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1);
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

  if(count == 5){
    //alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return true;
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
  if(count == 5){
    //alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return true;
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
  if(count == 5){
    //alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return true;
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
  if(count == 5){
    //alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    setTimeout(function() {
      alert(currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1) + " wins!");
    }, 200);
    return true;
  }

  return false;

}
