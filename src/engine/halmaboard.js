/**
 * @desc Kelas HalmaBoard: digunakan untuk merepresentasikan papan permainan halma
 */
class HalmaBoard {

    /**
     * @desc Konstuktor
     * @param {integer} size 
     */
    constructor(size) {
        this.size = size;
        this.state = [];

        var innerRow;
        for(var i = 1; i <= this.size; i++) {
            innerRow = []
            for(var j = 1; j <= this.size; j++) {
                innerRow.push('X');
            }
            this.state.push(innerRow);
        }
    }

    /**
     * @desc Update state papan setelah dilakukan aksi
     * @param {Action} action 
     */
    updateBoard(action) {
        let player = action.getExecutor();
        let xBefore = action.getBeforeCoord().getX();
        let yBefore = action.getBeforeCoord().getY();
        let xAfter = action.getAfterCoord().getX();
        let yAfter = action.getAfterCoord().getY();

        this.state[xBefore][yBefore] = 'X';
        this.state[xAfter][yAfter] = player;
    }

    objFunc() {
        /* Fungsi objektif */
    }

    isFinalState() {
        /* cek apakah sudah final state */ 
    }

}