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
            ((board[0][0].getValue() == "X") && (board[0][1].getValue() == "X") && (board[0][2].getValue() == "X")) ||
            ((board[1][0].getValue() == "X") && (board[1][1].getValue() == "X") && (board[1][2].getValue() == "X")) ||
            ((board[2][0].getValue() == "X") && (board[2][1].getValue() == "X") && (board[2][2].getValue() == "X"))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        } else if (
            // vertikal
            ((board[0][0].getValue() == "X") && (board[1][0].getValue() == "X") && (board[2][0].getValue() == "X")) ||
            ((board[0][1].getValue() == "X") && (board[1][1].getValue() == "X") && (board[2][1].getValue() == "X")) ||
            ((board[0][2].getValue() == "X") && (board[1][2].getValue() == "X") && (board[2][2].getValue() == "X"))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        } else if (
            // diagonal
            ((board[0][0].getValue() == "X") && (board[1][1].getValue() == "X") && (board[2][2].getValue() == "X"))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        } else if (
            // anti-diagonal
            ((board[0][2].getValue() == "X") && (board[1][1].getValue() == "X") && (board[2][0].getValue() == "X"))
        ) {
            console.log("Player One Win!");
            playerMove = false;
        };

        // Player Two
        if (
            // horizontal
            ((board[0][0].getValue() == "O") && (board[0][1].getValue() == "O") && (board[0][2].getValue() == "O")) ||
            ((board[1][0].getValue() == "O") && (board[1][1].getValue() == "O") && (board[1][2].getValue() == "O")) ||
            ((board[2][0].getValue() == "O") && (board[2][1].getValue() == "O") && (board[2][2].getValue() == "O"))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        } else if (
            // vertikal
            ((board[0][0].getValue() == "O") && (board[1][0].getValue() == "O") && (board[2][0].getValue() == "O")) ||
            ((board[0][1].getValue() == "O") && (board[1][1].getValue() == "O") && (board[2][1].getValue() == "O")) ||
            ((board[0][2].getValue() == "O") && (board[1][2].getValue() == "O") && (board[2][2].getValue() == "O"))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        } else if (
            // diagonal
            ((board[0][0].getValue() == "O") && (board[1][1].getValue() == "O") && (board[2][2].getValue() == "O"))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        } else if (
            // anti-diagonal
            ((board[0][2].getValue() == "O") && (board[1][1].getValue() == "O") && (board[2][0].getValue() == "O"))
        ) {
            console.log("Player Two Win!");
            playerMove = false;
        };

        // Check Tie!
        if (
            (
                (
                    ((board[0][0].getValue() == "X") || (board[0][0].getValue() == "O")) &&
                    ((board[0][1].getValue() == "X") || (board[0][1].getValue() == "O")) &&
                    ((board[0][2].getValue() == "X") || (board[0][2].getValue() == "O"))
                )
            ) &&
            (
                (
                    ((board[1][0].getValue() == "X") || (board[2][0].getValue() == "O")) &&
                    ((board[1][1].getValue() == "X") || (board[1][1].getValue() == "O")) &&
                    ((board[1][2].getValue() == "X") || (board[1][2].getValue() == "O"))
                )
            ) &&
            (
                (
                    ((board[2][0].getValue() == "X") || (board[2][0].getValue() == "O")) &&
                    ((board[2][1].getValue() == "X") || (board[2][1].getValue() == "O")) &&
                    ((board[2][2].getValue() == "X") || (board[2][2].getValue() == "O"))
                )
            )
        ) {
            console.log("It's Tie!");
            playerMove = false;
        };

        // game.playRound(0,0);
        // game.playRound(0,2);
        // game.playRound(0,1);
        // game.playRound(1,0);
        // game.playRound(2,0);
        // game.playRound(1,1);
        // game.playRound(1,2);
        // game.playRound(2,2);
        // game.playRound(2,1);

        // Yang baru
        // game.playRound(0,0);
        // game.playRound(2,0);
        // game.playRound(1,0);
        // game.playRound(0,1);
        // game.playRound(0,2);
        // game.playRound(1,1);
        // game.playRound(2,1);
        // game.playRound(2,2);
        // game.playRound(1,2);

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
            token: "X"
        },
        {
            name: playerTwoName,
            token: "O"
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
// refactor dari 1 menjadi X dan 2 menjadi O
// playRound = (column, row) menjadi playRound = (row, column)
// refactor dropToken = (column, row, player) menjadi dropToken = (row, column, player)