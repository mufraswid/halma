/**
 * @desc Kelas Aksi: merepresentasikan aksi dari suatu pemain dalam memindahkan bidak
 */
class Aksi {

    /**
     * @desc Konstruktor
     * @param {char} player 
     * @param {Koordinat} beforeCoord 
     * @param {Koordinat} afterCoord 
     */
    constructor(player, beforeCoord, afterCoord) {
        this.executor = player;
        this.beforeCoord = beforeCoord;
        this.afterCoord = afterCoord;
    }

    /**
     * @desc Getter eksekutor aksi
     */
    getExecutor() {
        return this.executor;
    }

    /**
     * @desc Getter koordinat bidak sebelum dpindahkan
     */
    getBeforeCoord() {
        return this.beforeCoord;
    }
    
    /**
     * @desc Getter koordinat bidak setelah dipindahkan
     */
    getAfterCoord() {
        return this.afterCoord;
    }

    /**
     * @desc Mengecek apakah suatu aksi merupakan aksi lompat
     * @param {PapanHalma} board 
     */
    isHopping(board) {
        let xBefore = this.beforeCoord.getX()
        let yBefore = this.beforeCoord.getY()
        let xAfter = this.afterCoord.getX()
        let yAfter = this.afterCoord.getY()

        let xDiff = Math.abs(xAfter - xBefore)
        let yDiff = Math.abs(yAfter - yBefore)

        if(xDiff > 2 || yDiff > 2 || xDiff === 1 || yDiff === 1) {
            return false;
        }

        if(xDiff === 0 && yDiff === 2) {
            let yMod = (yAfter > yBefore) ? 1 : -1;
            return board[xBefore][yBefore + yMod] !== 'X'

        } else if (yDiff === 0 && xDiff === 2) {
            let xMod = (xAfter > xBefore) ? 1 : -1;
            return board[xBefore + xMod][yBefore] !== 'X'

        } else { /* Diagonal Hopping */
            let xMod = (xAfter > xBefore) ? 1 : -1;
            let yMod = (yAfter > yBefore) ? 1 : -1;
            return board[xBefore + xMod][yBefore + yMod] !== 'X';
        }
    }

    /**
     * @desc mengecek apakah aksi yang dilakukan pemain legal
     * @param {PapanHalma} board 
     */
    isLegal(board) {
        let xBefore = this.beforeCoord.getX()
        let yBefore = this.beforeCoord.getY()
        let xAfter = this.afterCoord.getX()
        let yAfter = this.afterCoord.getY()
        
        /* Legal conditions */
        let pieceIsExecutors = board[xBefore][yBefore] === this.executor;
        let afterIsEmpty = board[xAfter][yAfter] === 'X';
        let moveOnProximity = Math.abs(xAfter - xBefore) === 1 || Math.abs(yAfter - yBefore) === 1;

        return pieceIsExecutors && afterIsEmpty && (moveOnProximity || this.isHopping(board));
    }
}