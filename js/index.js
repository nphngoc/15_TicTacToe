let point;
point = prompt('Nhập số điểm cần để chiến thắng',0);

const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.querySelector('.reset');
const announcer = document.querySelector('.announcer');
const scoreX = document.querySelector('.turnsX');
const scoreO = document.querySelector('.turnsO');
const gradeX = document.querySelector('#score_X');
const gradeO = document.querySelector('#score_O');
const restartButton = document.querySelector('.restart');

let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

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

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }

if (!board.includes(''))
    announce(TIE);
}

const announce = (type) => {
    switch(type){
        case PLAYERO_WON:
            scoreO.textContent=Number(scoreO.textContent)+1;
            alert("O won!");
            resetButton.classList.remove('hide');
            if(scoreO.textContent === point){
                gradeO.innerText=Number(gradeO.innerText)+1;
                announcer.innerHTML = 'Player <span class="playerO">O</span> won!!!';
                announcer.classList.remove('hide');
                restartButton.classList.remove('hide');
                resetButton.classList.add('hide')
            };
            break;  
        case PLAYERX_WON:
            scoreX.textContent=Number(scoreX.textContent)+1;
            alert("X won!");
            resetButton.classList.remove('hide')
            if (scoreX.textContent === point){
                gradeX.innerText=Number(gradeX.innerText)+1;
                announcer.innerHTML = 'Player <span class="playerX">X</span> won!!!';
                announcer.classList.remove('hide');
                restartButton.classList.remove('hide');
                resetButton.classList.add('hide')
            };
            break;
        case TIE:
            alert('Game ended in a draw!');
            resetButton.classList.remove('hide');
    }
};

const isValidAction = (cell) => {
    if (cell.innerText === 'X' || cell.innerText === 'O'){
        return false;
    }
    return true;
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const userAction = (cell, index) => {
    if (isValidAction(cell) && isGameActive) {
        cell.innerText = currentPlayer;
        cell.classList.add('player' + currentPlayer);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const resetBoard = () => {
    board = ['','','','','','','','',''];
    isGameActive= true;
    announcer.classList.add('hide');
    resetButton.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    });
}

const restartBoard = () => {
    resetBoard();
    gradeX.innerText='0';
    gradeO.innerText='0';
    scoreO.textContent='0';
    scoreX.textContent='0';
    restartButton.classList.add('hide');
    point = prompt('Nhập số điểm cần để chiến thắng',0);
}

cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
});

resetButton.addEventListener('click',resetBoard);
restartButton.addEventListener('click',restartBoard);
