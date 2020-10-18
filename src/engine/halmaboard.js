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

        this.player1Pieces = []
        this.player2Pieces = []
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
                /* Render ke papan */
                this.board[xHomePoint + i][yHomePoint - j] = this.player1
                this.board[xEnemyPoint - i][yEnemyPoint + j] = this.player2
                /* Catat lokasi bidak setiap pemain */
                this.player1Pieces.push(new Coordinate(xHomePoint + i, yHomePoint - j))
                this.player2Pieces.push(new Coordinate(xEnemyPoint - i, yEnemyPoint + j))
            }
            offset -= 1
        }
    }

    /**
     * @desc Render papan ke page
     */
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
     * @desc Getter player pieces
     */
    getPlayerPieces(player) {
        if (player == 1) {
            return this.player1Pieces
        }
        else if (player == 2) {
            return this.player2Pieces
        }
    }

    /**
     * @desc Getter size board
     */
    getSize() {
        return this.size;
    }

    /**
     * @desc Mengembalikan objek HalmaBoard lain yang sama dengan objek ini
     */
    copyCons() {
        var cc = new HalmaBoard(this.size, this.mode)
        cc.board = this.board
        cc.player1 = this.player1
        cc.player2 = this.player2
        cc.player1Pieces = this.player1Pieces
        cc.player2Pieces = this.player2Pieces
        return cc
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
    }

    objFunc() {
        /* Fungsi objektif */
    }

    /**
     * @desc Cek apakah keadaan papan sudah final state
     */
    isFinalState() {
        var player1Win = true
        var player2Win = true
        for(var i = 0; i < 10; i++) {
            if(!this.isOnHome(this.player2, this.player1Pieces[i])) {
                player1Win = false
                break
            }
        }

        for(var i = 0; i < 10; i++) {
            if(!this.isOnHome(this.player1, this.player2Pieces[i])) {
                player2Win = false
                break
            }
        }

        if(player1Win) return 1
        if(player2Win) return 2
        return 0
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
            return coord.getY() <= coord.getX() - this.size + 4
        }
    }
}