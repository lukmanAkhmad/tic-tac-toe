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

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
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


})();