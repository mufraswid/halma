/**
 * @desc Kelas Action: merepresentasikan aksi dari suatu pemain dalam memindahkan bidak
 */
class Action {

    /**
     * @desc Konstruktor
     * @param {char} player 
     * @param {Coordinate} beforeCoord 
     * @param {Coordinate} afterCoord 
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
     * @param {HalmaBoard} board 
     */
    isHopping(board) {
        let xBefore = this.beforeCoord.getX()
        let yBefore = this.beforeCoord.getY()
        let xAfter = this.afterCoord.getX()
        let yAfter = this.afterCoord.getY()

        let xDiff = Math.abs(xAfter - xBefore)
        let yDiff = Math.abs(yAfter - yBefore)

        if (xDiff > 2 || yDiff > 2 || xDiff === 1 || yDiff === 1 || (xDiff === 0 && yDiff === 0)) {
            return false;
        }

        let xMod = 0;
        let yMod = 0;
        if (xDiff === 0 && yDiff === 2) {
            yMod = (yAfter > yBefore) ? 1 : -1;

        } else if (yDiff === 0 && xDiff === 2) {
            xMod = (xAfter > xBefore) ? 1 : -1;

        } else { /* Diagonal Hopping */
            xMod = (xAfter > xBefore) ? 1 : -1;
            yMod = (yAfter > yBefore) ? 1 : -1;
        }

        return board.getBoard()[xBefore + xMod][yBefore + yMod] != '-';
    }

    /**
     * @desc Mengecek apakah langkah masuk ke rumah sendiri atau tidak
     * @param {HalmaBoard} board 
     */
    isGoBackHome(board) {
        return !board.isOnHome(this.executor, this.beforeCoord) && board.isOnHome(this.executor, this.afterCoord);
    }

    /**
     * @desc Mengecek apakah langkah melampaui ukuran board atau tidak
     * @param {HalmaBoard} board 
     */
    isWithinBoard(board) {
        return this.afterCoord.getX() <= board.getSize() && this.afterCoord.getY() <= board.getSize();
    }

    /**
     * @desc mengecek apakah aksi yang dilakukan pemain legal
     * @param {HalmaBoard} board 
     */
    isLegal(board) {
        let xBefore = this.beforeCoord.getX()
        let yBefore = this.beforeCoord.getY()
        let xAfter = this.afterCoord.getX()
        let yAfter = this.afterCoord.getY()

        /* Legal conditions */
        let pieceIsExecutors = board.getBoard()[xBefore][yBefore] === this.executor;
        let afterIsEmpty = board.getBoard()[xAfter][yAfter] === '-';
        let moveOnProximity = Math.abs(xAfter - xBefore) === 1 || Math.abs(yAfter - yBefore) === 1;

        return pieceIsExecutors && afterIsEmpty && this.isWithinBoard(board) && (moveOnProximity || this.isHopping(board)) && !this.isGoBackHome(board);
    }
}