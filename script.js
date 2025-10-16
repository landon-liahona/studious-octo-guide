const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');

// Sound effects
const moveSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b6a4f4c.mp3'); // click sound
const winSound = new Audio('https://cdn.pixabay.com/audio/2022/10/16/audio_124b0e5a4f.mp3'); // victory sound
const drawSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b6a4f4c.mp3'); // click sound (reuse or choose another)
const resetSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b6a4f4c.mp3'); // click sound

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
    moveSound.currentTime = 0;
    moveSound.play();
    if (checkWinner(currentPlayer)) {
        status.textContent = `Player ${currentPlayer} wins!`;
        winSound.currentTime = 0;
        winSound.play();
        gameActive = false;
    } else if (squares.every(Boolean)) {
        status.textContent = "It's a draw!";
        drawSound.currentTime = 0;
        drawSound.play();
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
    renderBoard();
}

function checkWinner(player) {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return wins.some(line => line.every(idx => squares[idx] === player));
}

resetBtn.onclick = () => {
    squares = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player X's turn`;
    resetSound.currentTime = 0;
    resetSound.play();
    renderBoard();
};

renderBoard();
