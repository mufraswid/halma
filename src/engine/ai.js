/**
 * @desc Kelas HalmaAI: merepresentasikan bot HalmaAI yang mengimplementasikan algoritma minimax ((ONGOING))
 */
class HalmaAI {
    constructor(board, maxDepth, player) {
        this.memoryBoard = board;
        this.maxDepth = maxDepth;
        this.player = player;
    }

    getAllStates(coord, board) {
    	var states = []
        var up = new Action(this.player, coord, new Coordinate(x, y + 1));
        if (up.isLegal()) {
            states.push(board.copyCons().updateBoard(up))
        }
        else {
            states.concat(getAllHops(up.getAfterCoord(),board))
        }
        var down = new Action(this.player, coord, new Coordinate(x, y - 1));
        if (down.isLegal()) {
            states.push(board.copyCons().updateBoard(down))
        }
        else {
            states.concat(getAllHops(down.getAfterCoord(),board))
        }
        var right = new Action(this.player, coord, new Coordinate(x + 1, y));
        if (right.isLegal()) {
            states.push(board.copyCons().updateBoard(right))
        }
        else {
            states.concat(getAllHops(right.getAfterCoord(),board))
        }
        var left = new Action(this.player, coord, new Coordinate(x - 1, y));
        if (left.isLegal()) {
            states.push(board.copyCons().updateBoard(left))
        }
        else {
            states.concat(getAllHops(left.getAfterCoord(),board))
        }
        var upright = new Action(this.player, coord, new Coordinate(x + 1, y + 1));
        if (upright.isLegal()) {
            states.push(board.copyCons().updateBoard(upright))
        }
        else {
            states.concat(getAllHops(upright.getAfterCoord(),board))
        }
        var upleft = new Action(this.player, coord, new Coordinate(x - 1, y + 1));
        if (upleft.isLegal()) {
            states.push(board.copyCons().updateBoard(upleft))
        }
        else {
            states.concat(getAllHops(upleft.getAfterCoord(),board))
        }
        var downright = new Action(this.player, coord, new Coordinate(x + 1, y - 1));
        if (downright.isLegal()) {
            states.push(board.copyCons().updateBoard(downright))
        }
        else {
            states.concat(getAllHops(downright.getAfterCoord(),board))
        }
        var downleft = new Action(this.player, coord, new Coordinate(x - 1, y - 1));
        if (downleft.isLegal()) {
            states.push(board.copyCons().updateBoard(downleft))
        }
        else {
            states.concat(getAllHops(downleft.getAfterCoord(),board))
        }
    	return states;
    }

    getAllHops(coord, board) {
        var states = []
        var up = new Action(this.player, coord, new Coordinate(x, y + 2));
        if (up.isLegal()) {
            states.push(board.copyCons().updateBoard(up))
        }
        else {
            states.concat(getAllHops(up.getAfterCoord(),board))
        }
        var down = new Action(this.player, coord, new Coordinate(x, y - 2));
        if (down.isLegal()) {
            states.push(board.copyCons().updateBoard(down))
        }
        else {
            states.concat(getAllHops(down.getAfterCoord(),board))
        }
        var right = new Action(this.player, coord, new Coordinate(x + 2, y));
        if (right.isLegal()) {
            states.push(board.copyCons().updateBoard(right))
        }
        else {
            states.concat(getAllHops(right.getAfterCoord(),board))
        }
        var left = new Action(this.player, coord, new Coordinate(x - 2, y));
        if (left.isLegal()) {
            states.push(board.copyCons().updateBoard(left))
        }
        else {
            states.concat(getAllHops(left.getAfterCoord(),board))
        }
        var upright = new Action(this.player, coord, new Coordinate(x + 2, y + 1));
        if (upright.isLegal()) {
            states.push(board.copyCons().updateBoard(upright))
        }
        else {
            states.concat(getAllHops(upright.getAfterCoord(),board))
        }
        var upleft = new Action(this.player, coord, new Coordinate(x - 2, y + 2));
        if (upleft.isLegal()) {
            states.push(board.copyCons().updateBoard(upleft))
        }
        else {
            states.concat(getAllHops(upleft.getAfterCoord(),board))
        }
        var downright = new Action(this.player, coord, new Coordinate(x + 2, y - 2));
        if (downright.isLegal()) {
            states.push(board.copyCons().updateBoard(downright))
        }
        else {
            states.concat(getAllHops(downright.getAfterCoord(),board))
        }
        var downleft = new Action(this.player, coord, new Coordinate(x - 2, y - 2));
        if (downleft.isLegal()) {
            states.push(board.copyCons().updateBoard(downleft))
        }
        else {
            states.concat(getAllHops(downleft.getAfterCoord(),board))
        }
        return states;
    }

    /*getMove(algorithm) {
    	var pieces = this.memoryBoard.getPlayerPieces(player);
    	var states = []
        for (i = 0; i < pieces.length; i++) {
    	 	states.concat(getAllStates(pieces[i], this.memoryBoard))
        }
    	var utilities = []
        for (j = 0; j < pieces.length; j++) {
            utilities.push(states[j].objfunc())
        }
        if (algorithm == 'minimax-only') {
            minimax(states, utilities, this.maxDepth)
        }
        else if (algorithm == 'minimax-localsearch') {
            localsearch(states, utilities, this.maxDepth)
        }
    }
}*/