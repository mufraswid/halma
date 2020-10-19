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
    	var states = [];
        var coord = [];
        var x = coord.getX();
        var y = coord.getY();
        coord.push(new Coordinate(x, y + 1));
        coord.push(new Coordinate(x, y - 1));
        coord.push(new Coordinate(x + 1, y));
        coord.push(new Coordinate(x - 1, y));
        coord.push(new Coordinate(x + 1, y + 1));
        coord.push(new Coordinate(x + 1, y - 1));
        coord.push(new Coordinate(x - 1, y + 1));
        coord.push(new Coordinate(x - 1, y - 1));
        for (i = 0; i < coord.length; i++) {
            action = new Action(this.player, coord, coord[i])
            if action.isLegal() {
                states.push(board.copyCons().updateBoard(action))
            }
        }
        states = states.concat(getAllHops(coord, board, coordlist))
    	return states;
    }

    getAllHops(coord, board, coordlist) {
        var coords = [];
        var final = [];
        var x = coord.getX();
        var y = coord.getY();
        coords.push(new Coordinate(x, y + 2));
        coords.push(new Coordinate(x, y - 2));
        coords.push(new Coordinate(x + 2, y));
        coords.push(new Coordinate(x - 2, y));
        coords.push(new Coordinate(x + 2, y + 2));
        coords.push(new Coordinate(x - 2, y + 2));
        coords.push(new Coordinate(x + 2, y - 2));
        coords.push(new Coordinate(x - 2, y - 2));
        for (i = 0; i < coords.length - 1; i++) {
            act = new Action(this.player, coord, coords[i])
            if act.isLegal() {
                if !coordlist.includes(coords[i]) {
                    coordlist.push(coords[i])
                    update = board.copyCons().updateBoard(act)
                    final.push(update)
                    final = final.concat(getAllHops(coords[i], update, coordlist))
                }
            }
        }
        return final;
    }

    getMove(algorithm) {
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
}