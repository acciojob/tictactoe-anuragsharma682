let player1, player2;
let currentPlayer, currentSymbol;
let board = Array(9).fill(null);
let gameOver = false;

// Winning combinations
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", function() {
  player1 = document.getElementById("player-1").value || "Player 1";
  player2 = document.getElementById("player-2").value || "Player 2";

  // Hide form, show board
  document.querySelector(".player-form").style.display = "none";
  const gameBoard = document.querySelector(".game-board");
  gameBoard.style.display = "block";

  currentPlayer = player1;
  currentSymbol = "X";
  document.querySelector(".message").textContent = `${currentPlayer}, you're up`;

  // Clear board
  board = Array(9).fill(null);
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.style.pointerEvents = "auto";
  });
  gameOver = false;
});

// Handle cell clicks
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", function() {
    if (gameOver) return;
    const index = parseInt(this.id) - 1;

    if (board[index] === null) {
      board[index] = currentSymbol;
      this.textContent = currentSymbol;

      if (checkWin()) {
        document.querySelector(".message").textContent = `${currentPlayer} congratulations you won!`;
        gameOver = true;
        document.querySelectorAll(".cell").forEach(c => c.style.pointerEvents = "none");
        return;
      }

      // Check draw
      if (board.every(cell => cell !== null)) {
        document.querySelector(".message").textContent = `It's a draw!`;
        gameOver = true;
        return;
      }

      // Switch player
      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
      } else {
        currentPlayer = player1;
        currentSymbol = "X";
      }
      document.querySelector(".message").textContent = `${currentPlayer}, you're up`;
    }
  });
});

// Check for win
function checkWin() {
  return winCombos.some(combo => {
    const [a,b,c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}
