const display = document.getElementById("display");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");
const restartpoint = document.getElementById("restartpoint");

const winningpattern = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // columns
    [0,4,8], [2,4,6]             // diagonals
];

let option = ["","","","","","","","",""];
let currentplayer = "X";
let running = false;

// Initialize win counters
let xWins = 0;
let oWins = 0;

// Get display elements for win counts - FIXED: using getElementById
const xWinDisplay = document.getElementById("xwin");
const oWinDisplay = document.getElementById("ywin");

initialize();

function initialize() {
   cells.forEach(cell => cell.addEventListener("click", cellClicked));
   restartBtn.addEventListener("click", restartgame);
   restartpoint.addEventListener("click",resetScores);
   running = true;
   updateStatus();
}

function cellClicked() {
   if(!running) return;
  
   const cellIndex = this.getAttribute("cellIndex");

   if(option[cellIndex] != "") return;
   updateCell(this, cellIndex);
   checkWin();

   if(running){
    currentplayer = currentplayer === "X" ? "O" : "X";
    updateStatus();
   }
}

function updateCell(cell, index) {
   option[index] = currentplayer;
   cell.textContent = currentplayer;
   
   // Add animation class
   cell.classList.add("cell-active");
   setTimeout(() => {
       cell.classList.remove("cell-active");
   }, 150);
}

function checkWin() {
    let roundWon = false;

    for(let i = 0; i < winningpattern.length; i++){
        const [a, b, c] = winningpattern[i];
        if(option[a] && option[a] === option[b] && option[a] === option[c]){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        display.textContent = `${currentplayer} wins! 🎉`;
        
        // Update points based on winner
        updatePoints(currentplayer);
        
        // Add win celebration animation
        document.querySelector('.game').classList.add('victory-global');
        setTimeout(() => {
            document.querySelector('.game').classList.remove('victory-global');
        }, 1000);
        
        running = false;
        return;
    }
    
    // Check for draw
    const isDraw = option.every(cell => cell !== "");
    if (isDraw) {
        display.textContent = "It's a draw! 🤝";
        running = false;
    }
}

// NEW FUNCTION: Update points counter
function updatePoints(winner) {
    if (winner === "X") {
        xWins++;
        if (xWinDisplay) {
            xWinDisplay.textContent = xWins;
            // Add celebration animation
            xWinDisplay.classList.add("highscore-glow");
            setTimeout(() => {
                xWinDisplay.classList.remove("highscore-glow");
            }, 300);
        }
    } 
    else if (winner === "O") {
        oWins++;
        if (oWinDisplay) {
            oWinDisplay.textContent = oWins;
            // Add celebration animation
            oWinDisplay.classList.add("highscore-glow");
            setTimeout(() => {
                oWinDisplay.classList.remove("highscore-glow");
            }, 300);
        }
    }
}

function updateStatus() {
   if(running){
    display.textContent = `${currentplayer}'s turn`;
   }
}
 
function restartgame(){ 
    option = ["","","","","","","","",""];
    cells.forEach(cell => cell.textContent = "");
    running = true;
    currentplayer = "X";
    updateStatus();
    display.textContent = "Game Restarted! X's turn";
    
    // Optional: Reset points as well (uncomment if you want to reset scores)
    // xWins = 0;
    // oWins = 0;
    // xWinDisplay.textContent = "0";
    // oWinDisplay.textContent = "0";
}

// Optional: Function to reset only scores (can be called separately)
function resetScores() {
    xWins = 0;
    oWins = 0;
    xWinDisplay.textContent = "0";
    oWinDisplay.textContent = "0";
    display.textContent = "Scores reset!";
    setTimeout(() => {
        if(running) updateStatus();
    }, 1500);
}