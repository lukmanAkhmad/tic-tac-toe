function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }
    console.log(board)

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    let playerMove = true;
    const getPlayerMove = () => playerMove;

    const dropToken = (column, row, player) => {
        const rows = row;
        const availableCells = board[rows][column].getValue() !== 0;

        if (availableCells) {
            playerMove = false;
            console.log(playerMove);
            return;
        } else {
            playerMove = true;
            console.log(playerMove);
            board[rows][column].addToken(player);
        };

        console.log(board[rows][column].getValue());
    };

    return {
        printBoard,
        dropToken,
        getPlayerMove
    };
};

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
};

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column, row) => {
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${column} and row ${row}...`
        );

        board.dropToken(column, row, getActivePlayer().token);

        if (board.getPlayerMove() === false) {
            printNewRound();
            return;
        } else {
            switchPlayerTurn();
            printNewRound();
        };
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        board
    };
};

const game = GameController();

// Jika cell sudah diisi maka tidak bisa diisi kembali dan player yang jalan tetap memilih cell, bukan player selanjutnya yang jalan!