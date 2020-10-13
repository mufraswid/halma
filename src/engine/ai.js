/**
 * @desc Kelas HalmaAI: merepresentasikan bot HalmaAI yang mengimplementasikan algoritma minimax ((ONGOING))
 */
class HalmaAI {
    constructor(board, maxDepth) {
        this.memoryBoard = board;
        this.maxDepth = maxDepth;
    }

    objFunc(state) {
        /* Fungsi objektif */
    }

    isFinalState(state) {
        /* cek apakah sudah final state */ 
    }


    min(state, curDepth) {
        if(curDepth === this.maxDepth || this.isFinalState(state)) {
            return this.objFunc(state);
        }

        /* TBD */

    }


    max(state, curDepth) {
        if(curDepth === this.maxDepth || this.isFinalState(state)) {
            return this.objFunc(state);
        }

        /* TBD */

    }
}