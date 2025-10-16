const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let squares = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function renderBoard() {
    board.innerHTML = '';
    squares.forEach((val, i) => {
        const btn = document.createElement('button');
        btn.className = 'square';
        btn.textContent = val || '';
        btn.disabled = !!val || !gameActive;
        btn.onclick = () => handleMove(i);
        board.appendChild(btn);
    });
}

function handleMove(i) {
    if (!gameActive || squares[i]) return;
    squares[i] = currentPlayer;
    if (checkWinner(currentPlayer)) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (squares.every(Boolean)) {
        status.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    renderBoard();
}

function checkWinner(player) {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8], // rows
        [0,3,6], [1,4,7], [2,5,8], // cols
        [0,4,8], [2,4,6]           // diags
    ];
    return wins.some(line => line.every(idx => squares[idx] === player));
}

resetBtn.onclick = () => {
    squares = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player X's turn`;
    renderBoard();
};

renderBoard();
