export function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

export function checkHasWon(whichPlayersTurn, board) {
    for (let i = 0; i < 3; i++) {
        // horizontal checks
        if (board[i][0] === whichPlayersTurn && board[i][1] === whichPlayersTurn && board[i][2] === whichPlayersTurn) {
            return true
        }
        // vertical checks
        if (board[0][i] === whichPlayersTurn && board[1][i] === whichPlayersTurn && board[2][i] === whichPlayersTurn) {
            return true
        }
    }

    // diagonal checks
    if (board[0][0] === whichPlayersTurn && board[1][1] === whichPlayersTurn && board[2][2] === whichPlayersTurn) {
        return true;
    }
    if (board[2][0] === whichPlayersTurn && board[1][1] === whichPlayersTurn && board[0][2] === whichPlayersTurn) {
        return true;
    }

    return false;
}