/**
 * @desc Kelas HalmaAI: merepresentasikan bot HalmaAI yang mengimplementasikan algoritma minimax ((ONGOING))
 */
class HalmaAI {
    constructor(board, maxDepth, player, opponent) {
        this.memoryBoard = board;
        this.maxDepth = maxDepth;
        this.player = player;
        this.opponent = opponent;
    }

    getAllActions(coord, board, player) {
    	var actions = [];
        var coords = [];
        var x = coord.getX();
        var y = coord.getY();
        coords.push(new Coordinate(x, y + 1));
        coords.push(new Coordinate(x, y - 1));
        coords.push(new Coordinate(x + 1, y));
        coords.push(new Coordinate(x - 1, y));
        coords.push(new Coordinate(x + 1, y + 1));
        coords.push(new Coordinate(x + 1, y - 1));
        coords.push(new Coordinate(x - 1, y + 1));
        coords.push(new Coordinate(x - 1, y - 1));
        for (var i = 0; i < coords.length; i++) {
            var action = new Action(player, coord, coords[i])
            if (action.isLegal(board)) {
                actions.push(action)
            }
        }
        actions = actions.concat(this.getAllHops(coord, board, coords, player))
    	return actions;
    }

    getAllHops(coord, board, coordlist, player) {
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
        if (coordlist.length > Math.pow(board.getSize(),2)) {
            return final;
        }
        for (var i = 0; i < coords.length - 1; i++) {
            var act = new Action(player, coord, coords[i])
            if (act.isLegal(board)) {
                if (!coordlist.includes(coords[i])) {
                    coordlist.push(coords[i])
                    var update = board.copyCons()
                    update.updateBoard(act)
                    final.push(act)
                    final = final.concat(this.getAllHops(coords[i], update, coordlist, player))
                }
            }
        }
        return final;
    }

    getMove(algorithm) {
        if (algorithm == 'minimax-only') {
            return this.alphaBeta(this.maxDepth)
        }
        else if (algorithm == 'minimax-localsearch') {
            return this.localSearch(this.maxDepth)
        }
    }

    alphaBeta(depth) {
        var actions = []
        var values = []
        var pieces = this.memoryBoard.getPlayerPieces(this.player);
        for (var i = 0; i < pieces.length; i++) {
            actions = actions.concat(this.getAllActions(pieces[i], this.memoryBoard, this.player))
        }
        var alpha = -Infinity;
        var beta = Infinity;
        var v = -Infinity;
        for (var j = 0; j < actions.length; j++) {
            var update = this.memoryBoard.copyCons()
            update.updateBoard(actions[j])
            var minval = this.minValue(update, alpha, beta, depth-1)
            values.push(minval)
            v = Math.max(v, minval)
            if (v >= beta) {
                return actions[j];
            }
            alpha = Math.max(v, alpha)
        }
        var indexmax = values.indexOf(v)
        return actions[indexmax];
    }

    maxValue(state, alpha, beta, depth) {
        if (depth === 0 || state.isFinalState()) {
            return state.objFunc();
        }
        var actions = []
        var pieces = state.getPlayerPieces(this.player);
        for (var i = 0; i < pieces.length; i++) {
            actions = actions.concat(this.getAllActions(pieces[i], state, this.player))
        }
        var v = -Infinity;
        for (var j = 0; j < actions.length; j++) {
            var update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.max(v, this.minValue(update, alpha, beta, depth-1))
            if (v >= beta) {
                return v;
            }
            alpha = Math.max(v, alpha)
        }
        return v;
    }

    minValue(state, alpha, beta, depth) {
        if (depth === 0 || state.isFinalState()) {
            return state.objFunc();
        }
        var pieces = state.getPlayerPieces(this.opponent);
        for (var i = 0; i < pieces.length; i++) {
            actions = actions.concat(this.getAllActions(pieces[i], state, this.opponent))
        }
        var v = -Infinity;
        for (var j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.min(v, this.maxValue(update, alpha, beta, depth-1))
            if (v <= alpha) {
                return v;
            }
            beta = Math.min(v, beta)
        }
        return v;
    }

    localSearch(depth) {
        var pieces = this.memoryBoard.getPlayerPieces(this.player);
        var chosen = pieces[Math.floor(Math.random()*pieces.length)];
        var values = [];
        var actions = this.getAllActions(chosen, this.memoryBoard, this.player);
        var alpha = -Infinity;
        var beta = Infinity;
        var v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            var update = this.memoryBoard.copyCons()
            update.updateBoard(actions[j])
            minval = this.minValueLS(update, alpha, beta, depth-1)
            values.push(minval)
            v = Math.max(v, minval)
            if (v >= beta) {
                return actions[j];
            }
            alpha = Math.max(v, alpha)
        }
        var indexmax = values.indexOf(v)
        return actions[indexmax];
    }

    maxValueLS(state, alpha, beta, depth) {
        if (depth === 0 || state.isFinalState()) {
            return state.objFunc();
        }
        var pieces = state.getPlayerPieces(this.player);
        var chosen = pieces[Math.floor(Math.random()*pieces.length)];
        var actions = this.getAllActions(chosen, state, this.player);
        var v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            var update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.max(v, this.minValueLS(update, alpha, beta, depth-1))
            if (v >= beta) {
                return v;
            }
            alpha = Math.max(v, alpha)
        }
        return v;
    }

    minValueLS(state, alpha, beta, depth) {
        if (depth === 0 || state.isFinalState()) {
            return state.objFunc();
        }
        var pieces = state.getPlayerPieces(this.opponent);
        var chosen = pieces[Math.floor(Math.random()*pieces.length)];
        var actions = this.getAllActions(chosen, state, this.opponent);
        var v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            var update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.min(v, this.maxValueLS(update, alpha, beta, depth-1))
            if (v <= alpha) {
                return v;
            }
            beta = Math.min(v, beta)
        }
        return v;
    }

    setBoard(board) {
        this.memoryBoard = board
    }

}