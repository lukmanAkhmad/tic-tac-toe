const buttonStart = document.querySelector("#buttonStart");
buttonStart.addEventListener("click", () => {
    console.log("Button start on click");
    ScreenController();
});

const restartButton = document.querySelector("#buttonRestart");
restartButton.addEventListener("click", () => {
    console.log("Button restart on click");
    const screenControl = ScreenController();
    screenControl.restart();
    screenControl.updateScreen();
});

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
    };

    const getBoard = () => board;

    let playerMove = true;
    const getPlayerMove = () => playerMove;

    const dropToken = (row, column, player) => {
        const rows = row;
        // const availableCells = board[rows][column].getValue() !== "";
        // const gameController = GameController();
        // let playerMove = gameController.getPlayerMove();

        // if (availableCells && playerMove) {
        //     playerMove = false;
        //     console.log(playerMove);
        //     return;
        // } else {
        //     playerMove = true;
        //     console.log(playerMove);
        //     board[rows][column].addToken(player);
        // };

        board[rows][column].addToken(player);

        console.log(board[rows][column].getValue());
    };

    return {
        printBoard,
        getBoard,
        dropToken,
        getPlayerMove
    };
};

function Cell() {
    let value = "";

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

    // let playerMove = true;
    // const getPlayerMove = () => playerMove;

    let playerMove = board.getPlayerMove();

    let gameOver = false;
    const getGameOver = () => gameOver;

    let statusTie = false;
    const getStatusTie = () => statusTie;

    let winnerPlayer = players.name;
    const getWinnerPlayer = () => winnerPlayer;

    const checkWinner = () => {
        if (
            // horizontal
            ((board.getBoard()[0][0].getValue() == "X") && (board.getBoard()[0][1].getValue() == "X") && (board.getBoard()[0][2].getValue() == "X")) ||
            ((board.getBoard()[1][0].getValue() == "X") && (board.getBoard()[1][1].getValue() == "X") && (board.getBoard()[1][2].getValue() == "X")) ||
            ((board.getBoard()[2][0].getValue() == "X") && (board.getBoard()[2][1].getValue() == "X") && (board.getBoard()[2][2].getValue() == "X"))
        ) {
            winnerPlayer = players[0];
            playerMove = false;
            gameOver = true;
        } else if (
            // vertikal
            ((board.getBoard()[0][0].getValue() == "X") && (board.getBoard()[1][0].getValue() == "X") && (board.getBoard()[2][0].getValue() == "X")) ||
            ((board.getBoard()[0][1].getValue() == "X") && (board.getBoard()[1][1].getValue() == "X") && (board.getBoard()[2][1].getValue() == "X")) ||
            ((board.getBoard()[0][2].getValue() == "X") && (board.getBoard()[1][2].getValue() == "X") && (board.getBoard()[2][2].getValue() == "X"))
        ) {
            winnerPlayer = players[0];
            playerMove = false;
            gameOver = true;
        } else if (
            // diagonal
            ((board.getBoard()[0][0].getValue() == "X") && (board.getBoard()[1][1].getValue() == "X") && (board.getBoard()[2][2].getValue() == "X"))
        ) {
            winnerPlayer = players[0];
            playerMove = false;
            gameOver = true;
        } else if (
            // anti-diagonal
            ((board.getBoard()[0][2].getValue() == "X") && (board.getBoard()[1][1].getValue() == "X") && (board.getBoard()[2][0].getValue() == "X"))
        ) {
            winnerPlayer = players[0];
            playerMove = false;
            gameOver = true;
        };

        if (
            // horizontal
            ((board.getBoard()[0][0].getValue() == "O") && (board.getBoard()[0][1].getValue() == "O") && (board.getBoard()[0][2].getValue() == "O")) ||
            ((board.getBoard()[1][0].getValue() == "O") && (board.getBoard()[1][1].getValue() == "O") && (board.getBoard()[1][2].getValue() == "O")) ||
            ((board.getBoard()[2][0].getValue() == "O") && (board.getBoard()[2][1].getValue() == "O") && (board.getBoard()[2][2].getValue() == "O"))
        ) {
            winnerPlayer = players[1];
            playerMove = false;
            gameOver = true;
        } else if (
            // vertikal
            ((board.getBoard()[0][0].getValue() == "O") && (board.getBoard()[1][0].getValue() == "O") && (board.getBoard()[2][0].getValue() == "O")) ||
            ((board.getBoard()[0][1].getValue() == "O") && (board.getBoard()[1][1].getValue() == "O") && (board.getBoard()[2][1].getValue() == "O")) ||
            ((board.getBoard()[0][2].getValue() == "O") && (board.getBoard()[1][2].getValue() == "O") && (board.getBoard()[2][2].getValue() == "O"))
        ) {
            winnerPlayer = players[1];
            playerMove = false;
            gameOver = true;
        } else if (
            // diagonal
            ((board.getBoard()[0][0].getValue() == "O") && (board.getBoard()[1][1].getValue() == "O") && (board.getBoard()[2][2].getValue() == "O"))
        ) {
            winnerPlayer = players[1];
            playerMove = false;
            gameOver = true;
        } else if (
            // anti-diagonal
            ((board.getBoard()[0][2].getValue() == "O") && (board.getBoard()[1][1].getValue() == "O") && (board.getBoard()[2][0].getValue() == "O"))
        ) {
            winnerPlayer = players[1];
            playerMove = false;
            gameOver = true;
        };

        // Check Tie!
        if (
            (
                (
                    ((board.getBoard()[0][0].getValue() == "X") || (board.getBoard()[0][0].getValue() == "O")) &&
                    ((board.getBoard()[0][1].getValue() == "X") || (board.getBoard()[0][1].getValue() == "O")) &&
                    ((board.getBoard()[0][2].getValue() == "X") || (board.getBoard()[0][2].getValue() == "O"))
                )
            ) &&
            (
                (
                    ((board.getBoard()[1][0].getValue() == "X") || (board.getBoard()[2][0].getValue() == "O")) &&
                    ((board.getBoard()[1][1].getValue() == "X") || (board.getBoard()[1][1].getValue() == "O")) &&
                    ((board.getBoard()[1][2].getValue() == "X") || (board.getBoard()[1][2].getValue() == "O"))
                )
            ) &&
            (
                (
                    ((board.getBoard()[2][0].getValue() == "X") || (board.getBoard()[2][0].getValue() == "O")) &&
                    ((board.getBoard()[2][1].getValue() == "X") || (board.getBoard()[2][1].getValue() == "O")) &&
                    ((board.getBoard()[2][2].getValue() == "X") || (board.getBoard()[2][2].getValue() == "O"))
                )
            )
        ) {
            console.log("It's Tie!");
            statusTie = true;
            playerMove = false;
            gameOver = true;
        };
    };

    const playRound = (row, column) => {
        if (getGameOver() === true) return;
        console.log(
            `Dropping ${getActivePlayer().name}'s token into row ${row} and column ${column}...`
        );
        board.dropToken(row, column, getActivePlayer().token);

        // check Winner
        checkWinner();

        if (playerMove === false) {
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
        getBoard: board.getBoard,
        getStatusTie,
        getWinnerPlayer,
        getGameOver,
        // getPlayerMove
    };
};

function ScreenController() {
    const messages = document.querySelector(".messages");
    const boardDiv = document.querySelector(".board");

    const playerOneInput = document.querySelector("#player-1");
    const playerTwoInput = document.querySelector("#player-2");
    let namePlayerOne = playerOneInput.value;
    let namePlayerTwo = playerTwoInput.value;

    const game = GameController(namePlayerOne, namePlayerTwo);

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();
        const statusTie = game.getStatusTie();
        const winnerPlayer = game.getWinnerPlayer();
        const gameOver = game.getGameOver();

        messages.textContent = `${activePlayer.name} turn...`;

        if (gameOver && !statusTie) {
            messages.textContent = "";
            messages.textContent = `${winnerPlayer.name} Win!`;
        } else if (statusTie) {
            messages.textContent = "";
            messages.textContent = `It's Tie!`;
        };

        board.forEach((row, rowIdx) => {
            row.forEach((cell, columnIdx) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                let getCellButtonDatasetRows = cellButton.dataset.rowsss;
                getCellButtonDatasetRows = rowIdx;
                let getCellButtonDatasetColumns = cellButton.dataset.column;
                getCellButtonDatasetColumns = columnIdx;

                cellButton.addEventListener("click", () => {
                    console.log("cell button on click");
                    const selectedColumn = getCellButtonDatasetColumns;
                    const selectedRowsss = getCellButtonDatasetRows;

                    if (cellButton.textContent !== "") return;
                    cellButton.textContent = cell.getValue();
                    game.playRound(selectedRowsss, selectedColumn);
                    clickHandlerCell();
                });

                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);

            })
        })
    };

    function clickHandlerCell() {
        updateScreen();
    };

    updateScreen();

    const restart = () => {
        game.getBoard();
    }

    return {
        updateScreen,
        restart
    }

};