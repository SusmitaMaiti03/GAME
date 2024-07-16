const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const overlay = document.getElementById('overlay');
const messageBox = document.getElementById('message');
const newGameButton = document.getElementById('new-game');
let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    cell.innerText = currentPlayer;
    boardState[cellIndex] = currentPlayer;

    checkResult();
};

const checkResult = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageBox.innerText = `Player ${currentPlayer} has won!`;
        gameActive = false;
        overlay.style.display = 'flex';
        return;
    }

    if (!boardState.includes('')) {
        messageBox.innerText = `Game ended in a draw!`;
        gameActive = false;
        overlay.style.display = 'flex';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const resetGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    boardState = Array(9).fill('');
    cells.forEach(cell => cell.innerText = '');
    overlay.style.display = 'none';
};

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame);
