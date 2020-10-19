/**
 * @desc Kelas Coordinate: merepresentasikan lokasi bidak
 */
class Coordinate {

    /**
     * @desc Konstruktor
     * @param {integer} xcoord Koordinat-x bidak
     * @param {integer} ycoord Koordinat-y bidak
     */
    constructor(xcoord, ycoord) {
        this.xcoord = xcoord;
        this.ycoord = ycoord;
    }

    /**
     * @desc Mengambil koordinat-x dari bidak 
     */
    getX() {
        return this.xcoord;
    }

    /**
     * @desc Mengambil koordinat-y dari bidak
     */
    getY() {
        return this.ycoord;
    }

    /**
     * @desc Mengecek apakah langkah melampaui ukuran board atau tidak
     * @param {HalmaBoard} board 
     */
    isWithinBoard(board) {
        return this.xcoord <= board.getSize() && this.xcoord <= board.getSize();
    }

    /**
     * @desc Operator equal
     * @param {Coordinate} other
     */
    equal(other) {
        return this.xcoord == other.getX() && this.ycoord == other.getY()
    }
}