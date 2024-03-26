const startButton = document.querySelector('#startButton');
const restartButton = document.querySelector('#restartButton');

startButton.addEventListener('click', () => {
    gamePlay.start()
})

restartButton.addEventListener('click', () => {
    gamePlay.restart()
})

const Gameboard = (() => {
    let gameboard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        let boardHTML = '';
        gameboard.forEach((currentValue, index) => {
            boardHTML += `<div class="square" id="square-${index}">${currentValue}</div>`
        });
        document.querySelector('#board').innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', gamePlay.handleClick)
        })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard,
    }
})();

function checkForWin(board) {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) return true;
    }
    return false;
}

function checkForTie(board) {
    return board.every((cell) => cell !== '')
}

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const gamePlay = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');

    const start = () => {
        players = [
            createPlayer(player1.value, 'X'),
            createPlayer(player2.value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', handleClick)
        })
    }

    const handleClick = (event) => {
        if (gameOver) return;
        let index = parseInt(event.target.id.split('-')[1]);
        if (Gameboard.getGameboard()[index] !== '') return;

        Gameboard.update(index, players[currentPlayerIndex].mark)
        if (checkForWin(Gameboard.getGameboard())) {
            gameOver = true;
            displayControler.renderMessage(`${players[currentPlayerIndex].name} Win!`)
        } else if (checkForTie(Gameboard.getGameboard())) {
            gameOver = true;
            displayControler.renderMessage("It's a tie")
        }
        currentPlayerIndex = (currentPlayerIndex === 0) ? 1 : 0;
    }

    const restart = () => {
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, '')
        }
        Gameboard.render();
        gameOver = false;
        document.querySelector('#message').textContent = '';
    }

    return {
        start,
        handleClick,
        restart,
    }
})();

const displayControler = (() => {
    const renderMessage = (message) => {
        document.querySelector('#message').textContent = message;
    }
    return {
        renderMessage,
    }
})();