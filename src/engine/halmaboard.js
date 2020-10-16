/**
 * @desc Kelas HalmaBoard: digunakan untuk merepresentasikan papan permainan halma
 */
class HalmaBoard {

    /**
     * @desc Konstuktor
     * @param {integer} size 
     */
    constructor(size, mode) {
        this.size = size;
        this.board = [];

        var innerRow;
        for(var i = 1; i <= this.size; i++) {
            innerRow = []
            for(var j = 1; j <= this.size; j++) {
                innerRow.push('-');
            }
            this.board.push(innerRow);
        }

        if(mode == 'PC' || mode == 'PCL') {
            this.player1 = 'P'
        } else {
            this.player1 = 'K'
        }

        this.player2 = 'C'

        this.initBoard()
        this.renderBoard()
    }

    /**
     * @desc Inisialisasi papan dengan bidak pemain
     */
    initBoard() {
        let xHomePoint = 0
        let yHomePoint = this.size - 1
        let xEnemyPoint = this.size - 1
        let yEnemyPoint = 0
        var offset = 4
        
        for(var i = 0; i < 4 ; i++) {
            for(var j = 0; j < offset; j++) {
                this.board[xHomePoint + i][yHomePoint - j] = this.player1
                this.board[xEnemyPoint - i][yEnemyPoint + j] = this.player2
            }
            offset -= 1
        }
    }

    renderBoard() {
        for(var i = 0; i < this.size * this.size; i++) {
            let x = i % 8
            let y = Math.floor(i/8)
            $('#cell' + i).html(this.board[x][y])
        }
    }

    /**
     * @desc Getter state papan
     */
    getBoard() {
        return this.board;
    }

    /**
     * @desc Update board papan setelah dilakukan aksi
     * @param {Action} action 
     */
    updateBoard(action) {
        let player = action.getExecutor();
        let xBefore = action.getBeforeCoord().getX();
        let yBefore = action.getBeforeCoord().getY();
        let xAfter = action.getAfterCoord().getX();
        let yAfter = action.getAfterCoord().getY();

        this.board[xBefore][yBefore] = '-';
        this.board[xAfter][yAfter] = player;

        let idBef = yBefore * 8 + xBefore
        let idAf = yAfter * 8 + xAfter

        $('#cell' + idBef).html('-')
        $('#cell' + idAf).html(player)
    }

    objFunc() {
        /* Fungsi objektif */
    }

    isFinalState() {
        /* cek apakah sudah final state */ 
    }

    /**
     * @desc Mengecek apakah bidak berada di rumah pemain
     * @param {char} player 
     * @param {Coordinate} coord 
     */
    isOnHome(player, coord) {
        if(player == 'P' || player == 'K') {
            return coord.getY() >= coord.getX() + this.size - 4
        } else {
            return coord.getY() >= coord.getX() - this.size + 4
        }
    }
}