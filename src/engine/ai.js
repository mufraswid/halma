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
        for (i = 0; i < coords.length; i++) {
            action = new Action(player, coord, coords[i])
            if (action.isLegal(board)) {
                actions.push(action)
            }
        }
        actions = actions.concat(getAllHops(coord, board, coords, player))
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
        for (i = 0; i < coords.length - 1; i++) {
            act = new Action(player, coord, coords[i])
            if (act.isLegal(board)) {
                if (!coordlist.includes(coords[i])) {
                    coordlist.push(coords[i])
                    update = board.copyCons()
                    update.updateBoard(action)
                    final.push(act)
                    final = final.concat(getAllHops(coords[i], update, coordlist, player))
                }
            }
        }
        return final;
    }

    getMove(algorithm) {
        if (algorithm == 'minimax-only') {
            return alphaBeta(this.maxDepth)
        }
        else if (algorithm == 'minimax-localsearch') {
            return localSearch(this.maxDepth)
        }
    }

    alphaBeta(depth) {
        let actions = []
        let values = []
        let pieces = state.getPlayerPieces(this.player);
        for (i = 0; i < pieces.length; i++) {
            actions = actions.concat(getAllActions(pieces[i], this.memoryBoard, this.player))
        }
        var alpha = -Infinity;
        var beta = Infinity;
        let v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            minval = minValue(update, alpha, beta, depth-1)
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
        let pieces = state.getPlayerPieces(this.player);
        for (i = 0; i < pieces.length; i++) {
            actions = actions.concat(getAllActions(pieces[i], state, this.player))
        }
        let v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.max(v, minValue(update, alpha, beta, depth-1))
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
        let pieces = state.getPlayerPieces(this.opponent);
        for (i = 0; i < pieces.length; i++) {
            actions = actions.concat(getAllActions(pieces[i], state, this.opponent))
        }
        let v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.min(v, maxValue(update, alpha, beta, depth-1))
            if (v <= alpha) {
                return v;
            }
            beta = Math.min(v, beta)
        }
        return v;
    }

    localSearch(depth) {
        let pieces = state.getPlayerPieces(this.player);
        let chosen = pieces[Math.floor(Math.random()*pieces.length)];
        let values = [];
        let actions = getAllActions(chosen, this.memoryBoard, this.player);
        var alpha = -Infinity;
        var beta = Infinity;
        let v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            minval = minValueLS(update, alpha, beta, depth-1)
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
        let pieces = state.getPlayerPieces(this.player);
        let chosen = pieces[Math.floor(Math.random()*pieces.length)];
        let actions = getAllActions(chosen, state, this.player);
        let v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.max(v, minValueLS(update, alpha, beta, depth-1))
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
        let pieces = state.getPlayerPieces(this.opponent);
        let chosen = pieces[Math.floor(Math.random()*pieces.length)];
        let actions = getAllActions(chosen, state, this.opponent);
        let v = -Infinity;
        for (j = 0; j < actions.length; j++) {
            update = state.copyCons()
            update.updateBoard(actions[j])
            v = Math.min(v, maxValueLS(update, alpha, beta, depth-1))
            if (v <= alpha) {
                return v;
            }
            beta = Math.min(v, beta)
        }
        return v;
    }

}