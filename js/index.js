let point;
point = prompt('Nhập số điểm cần để chiến thắng',0);

const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.querySelector('.reset');
const announcer = document.querySelector('.announcer');
const goalX = document.querySelector('.goal_X');
const goalO = document.querySelector('.goal_O');
const scoreX = document.querySelector('#score_X');
const scoreO = document.querySelector('#score_O');
const restartButton = document.querySelector('.restart');
const clap = document.querySelector('.clap');

let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

function checkWinCondition() {
    let roundWon = false;
    if ((board[0]==='X' && board[1]==='X' && board[2]==='X')||
    (board[3]==='X' && board[4]==='X' && board[5]==='X')||
    (board[6]==='X' && board[7]==='X' && board[8]==='X')||
    (board[0]==='X' && board[3]==='X' && board[6]==='X')||
    (board[1]==='X' && board[4]==='X' && board[7]==='X')||
    (board[2]==='X' && board[5]==='X' && board[8]==='X')||
    (board[0]==='X' && board[4]==='X' && board[8]==='X')||
    (board[2]==='X' && board[4]==='X' && board[6]==='X'))
    {
        roundWon = true;
    }
    else if ((board[0]==='O' && board[1]==='O' && board[2]==='O')||
    (board[3]==='O' && board[4]==='O' && board[5]==='O')||
    (board[6]==='O' && board[7]==='O' && board[8]==='O')||
    (board[0]==='O' && board[3]==='O' && board[6]==='O')||
    (board[1]==='O' && board[4]==='O' && board[7]==='O')||
    (board[2]==='O' && board[5]==='O' && board[8]==='O')||
    (board[0]==='O' && board[4]==='O' && board[8]==='O')||
    (board[2]==='O' && board[4]==='O' && board[6]==='O'))
    {
        roundWon = true;
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
            goalO.textContent=Number(goalO.textContent)+1;
            alert("O won!");
            resetButton.classList.remove('hide');
            if(goalO.textContent === point){
                scoreO.innerText=Number(scoreO.innerText)+1;
                announcer.innerHTML = 'Player <span class="playerO">O</span> won!!!';
                announcer.classList.remove('hide');
                restartButton.classList.remove('hide');
                resetButton.classList.add('hide');
                clap.classList.remove('hide');
            };
            break;  
        case PLAYERX_WON:
            goalX.textContent=Number(goalX.textContent)+1;
            alert("X won!");
            resetButton.classList.remove('hide')
            if (goalX.textContent === point){
                scoreX.innerText=Number(scoreX.innerText)+1;
                announcer.innerHTML = 'Player <span class="playerX">X</span> won!!!';
                announcer.classList.remove('hide');
                restartButton.classList.remove('hide');
                resetButton.classList.add('hide')
                clap.classList.remove('hide');
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
    if (currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else if (currentPlayer === 'O'){
        currentPlayer = 'X';
    }
}

const userAction = (cell, index) => {
    if (isValidAction(cell) && isGameActive) {
        cell.innerText = currentPlayer;
        cell.classList.add('player' + currentPlayer);
        updateBoard(index);
        checkWinCondition();
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

const reloadGame = () => {
    resetBoard();
    goalO.textContent='0';
    goalX.textContent='0';
    point = prompt('Nhập số điểm cần để chiến thắng',0);
}

cells.forEach( (cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
});

resetButton.addEventListener('click',resetBoard);
restartButton.addEventListener('click',reloadGame);
