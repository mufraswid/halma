/**
 * @desc Kelas HalmaAI: merepresentasikan bot HalmaAI yang mengimplementasikan algoritma minimax ((ONGOING))
 */
class HalmaAI {
    constructor(board, maxDepth, player) {
        this.memoryBoard = board;
        this.maxDepth = maxDepth;
        this.player = player;
    }


    getAllMoves(coord, board) {
    	let moves = []
    	let down = coord.GetY();
    	let up = coord.GetY();
    	let right = coord.GetX();
    	let left = coord.GetY();
    	while (down != 0) {
    		let action = new Action(this.player, coord, new Coordinate(coord.GetX(), down - 1))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		down--
    	}
    	while (up != board.getSize()) {
    		action = new Action(this.player, coord, new Coordinate(coord.GetX(), up + 1))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		up++
    	}
    	while (right != board.getSize()) {
    		action = new Action(this.player, coord, new Coordinate(right + 1, coord.GetY()))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		right++
    	}
    	while (left != 0) {
    		action = new Action(this.player, coord, new Coordinate(left - 1, coord.GetY()))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		left--
    	}
    	down = coord.GetY();
    	up = coord.GetY();
    	right = coord.Getx();
    	left = coord.GetY();
    	while (down != 0 && right != board.getSize()) {
    		action = new Action(this.player, coord, new Coordinate(right + 1, down - 1))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		down--
    		right++
    	}
    	while (up != board.getSize() && left != 0) {
    		action = new Action(this.player, coord, new Coordinate(left - 1, up + 1))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		up++
    		left--
    	}
    	down = coord.GetY();
    	up = coord.GetY();
    	right = coord.Getx();
    	left = coord.GetY();
    	while (down != 0 && left != 0) {
    		action = new Action(this.player, coord, new Coordinate(left - 1, down - 1))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		down--
    		left--
    	}
    	while (up != board.getSize() && right != board.getSize()) {
    		action = new Action(this.player, coord, new Coordinate(right + 1, up + 1))
    		if action.isLegal(board) {
    			moves.push(action)
    			break;
    		}
    		up++
    		right++
    	}
    	return moves;
    }

    /*getMove() {
    	let pieces = this.memoryBoard.getPlayerPieces(player);
    	let moves = []
    	 for (i = 0; i < pieces.length; i++) {
    	 	moves.concat(getAllMoves(pieces[i], this.memoryBoard))
    	 }
    	let depth = this.MaxDepth;
    	while (depth != 0 && this.memoryBoard.isFinalState() != 0) {
    		minimax(moves, depth, isMaximizing)
    	}
    }
}*/