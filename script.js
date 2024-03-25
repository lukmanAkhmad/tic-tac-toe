const Gameboard = (() => {
    let gameboard = ['','','','','','','','','',];

    const render = () => {
        let boardHTML = '';
        gameboard.forEach((currentValue, index) => {
            boardHTML += `<div class="square" id="square-${index}">${currentValue}</div>`
        })
        const board = document.querySelector('#board');
        const squares = document.querySelectorAll('.square');

        board.innerHTML = boardHTML;
        squares.forEach((square) => {
            square.addEventListener('click', gamePlay.handleClick)
        })
    }

    const getGameboard = () => gameboard;

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const renderMessage = (message) => {
        document.querySelector('#message').textContent = message;
    }

    return {
        render,
        getGameboard,
        update,
        renderMessage,
    }

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

function checkForWin(board){
    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i = 0;i < winCombinations.length;i++){
        const [a,b,c] = winCombinations[i];
        if(board[a] && boar[a] === board[b] && board[a] === board[c]) return true;
    }
    return false;
}

const gamePlay = (() => {
    let player1 = document.querySelector('#player1');
    let player2 = document.querySelector('#player2');
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(player1.value, 'X'),
            createPlayer(player2.value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const handleClick = (event) => {
        if(gameOver) return;

        let index = parseInt(event.target.id.split('-')[1]);

        if(Gameboard.getGameboard()[index] !== '') return;

        Gameboard.update(index, players[currentPlayerIndex].mark);

        if(checkForWin(Gameboard.getGameboard())){
            gameOver = true;
            Gameboard.renderMessage(`${players[currentPlayerIndex].name} Wins!`)
        }
        
    }

    return {
        start,
    }

})();