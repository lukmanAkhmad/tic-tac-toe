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

    const dropToken = (column, player) => {
        const availableCells = board.filter((row) => row[column].getValue() === 0).map((row) => row[column]);

        if (!availableCells.length) return;

        const rows = availableCells.length;

        board[rows][column].addToken(player);
    }

    return {
        printBoard,
        dropToken
    };
};
Gameboard();

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

function GameController() {
    const board = Gameboard();
    return { board };
};

const game = GameController();