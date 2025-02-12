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
    console.log(board);

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    let playerMove = true;
    const getPlayerMove = () => playerMove;

    const checkWinner = () => {
        // [] sebelah kiri = row
        // [] sebelah kanan = column

        // Player One
        if (
            // horizontal
            ((board[0][0].getValue() == 1) && (board[0][1].getValue() == 1) && (board[0][2].getValue() == 1)) ||
            ((board[1][0].getValue() == 1) && (board[1][1].getValue() == 1) && (board[1][2].getValue() == 1)) ||
            ((board[2][0].getValue() == 1) && (board[2][1].getValue() == 1) && (board[2][2].getValue() == 1))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        } else if (
            // vertikal
            ((board[0][0].getValue() == 1) && (board[1][0].getValue() == 1) && (board[2][0].getValue() == 1)) ||
            ((board[0][1].getValue() == 1) && (board[1][1].getValue() == 1) && (board[2][1].getValue() == 1)) ||
            ((board[0][2].getValue() == 1) && (board[1][2].getValue() == 1) && (board[2][2].getValue() == 1))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        } else if (
            // diagonal
            ((board[0][0].getValue() == 1) && (board[1][1].getValue() == 1) && (board[2][2].getValue() == 1))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        } else if (
            // anti-diagonal
            ((board[0][2].getValue() == 1) && (board[1][1].getValue() == 1) && (board[2][0].getValue() == 1))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        };

        // Player Two
        if (
            // horizontal
            ((board[0][0].getValue() == 2) && (board[0][1].getValue() == 2) && (board[0][2].getValue() == 2)) ||
            ((board[1][0].getValue() == 2) && (board[1][1].getValue() == 2) && (board[1][2].getValue() == 2)) ||
            ((board[2][0].getValue() == 2) && (board[2][1].getValue() == 2) && (board[2][2].getValue() == 2))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        } else if (
            // vertikal
            ((board[0][0].getValue() == 2) && (board[1][0].getValue() == 2) && (board[2][0].getValue() == 2)) ||
            ((board[0][1].getValue() == 2) && (board[1][1].getValue() == 2) && (board[2][1].getValue() == 2)) ||
            ((board[0][2].getValue() == 2) && (board[1][2].getValue() == 2) && (board[2][2].getValue() == 2))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        } else if (
            // diagonal
            ((board[0][0].getValue() == 2) && (board[1][1].getValue() == 2) && (board[2][2].getValue() == 2))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        } else if (
            // anti-diagonal
            ((board[0][2].getValue() == 2) && (board[1][1].getValue() == 2) && (board[2][0].getValue() == 2))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        };
        // Check Tie!

    };

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
        getPlayerMove,
        checkWinner
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

        // check Winner
        board.checkWinner();

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

// get player Winner
// 1.Ambil nilai board
// 2.Jika nilai board terpenuhi maka permainan selesai dan player winner dimunculkan