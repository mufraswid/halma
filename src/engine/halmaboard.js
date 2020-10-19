/**
 * @desc Kelas HalmaBoard: digunakan untuk merepresentasikan papan permainan halma
 */
class HalmaBoard {

    /**
     * @desc Konstuktor
     * @param {integer} size 
     */
    constructor(size, mode, repP1, repP2, empty) {
        this.size = size;
        this.board = [];

        var innerRow;
        for (var i = 1; i <= this.size; i++) {
            innerRow = []
            for (var j = 1; j <= this.size; j++) {
                innerRow.push('-');
            }
            this.board.push(innerRow);
        }

        if (mode == 'PC' || mode == 'PCL') {
            this.player1 = 'P'
        } else {
            this.player1 = 'K'
        }

        this.player2 = 'C'

        this.player1Pieces = []
        this.player2Pieces = []
        // this.player1Color = localStorage.getItem('p1color')
        // this.player2Color = localStorage.getItem('p2color')
        /* testing purposes */
        this.player1Color = 'red'
        this.player2Color = 'green'

        this.repP1 = repP1
        this.repP2 = repP2
        this.empty = empty
    }

    /**
     * @desc Inisialisasi papan dengan bidak pemain
     */
    initBoard() {
        let xHomePoint = 0
        let yHomePoint = this.size - 1
        let xEnemyPoint = this.size - 1
        let yEnemyPoint = 0
        var base = 4

        $('#board').html(function (size) {
            let cellid = 0;
            let content = "";
            for (let i = 0; i < size; i++) {
                content = content.concat("<tr>");
                for (let j = 0; j < size; j++) {
                    content = content.concat("<td id=\"cell");
                    content = content.concat(cellid);
                    // if content.concat()
                    content = content.concat("\"> </td>");
                    cellid += 1;
                }
                content = content.concat("</tr>");
            }
            return content;
        }(this.size))


        if (this.size == 10) {
            base = 5
        } else if (this.size == 16) {
            base = 6
        }

        var offset = base

        for (var i = 0; i < base; i++) {
            if (i > 0) {
                this.board[xHomePoint + i][yHomePoint - offset] = this.player1
                this.player1Pieces.push(new Coordinate(xHomePoint + i, yHomePoint - offset))
                $('#cell' + this.getIdfromCoor(xHomePoint + i, yHomePoint - offset)).toggleClass("p1");
                this.board[xEnemyPoint - i][yEnemyPoint + offset] = this.player2
                this.player2Pieces.push(new Coordinate(xHomePoint - i, yHomePoint + offset))
                $('#cell' + this.getIdfromCoor(xEnemyPoint - i, yEnemyPoint + offset)).toggleClass("p2");
                console.log(this.getIdfromCoor(xEnemyPoint - i, yEnemyPoint + offset));
            }
            for (var j = 0; j < offset; j++) {
                /* Render ke papan */
                this.board[xHomePoint + i][yHomePoint - j] = this.player1
                this.board[xEnemyPoint - i][yEnemyPoint + j] = this.player2
                $('#cell' + this.getIdfromCoor(xHomePoint + i, yHomePoint - j)).toggleClass("p1");
                $('#cell' + this.getIdfromCoor(xEnemyPoint - i, yEnemyPoint + j)).toggleClass("p2");
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
        for (var i = 0; i < this.size * this.size; i++) {
            let x = i % 8
            let y = Math.floor(i / 8)
            if (this.board[x][y] == this.player1) {
                $('#cell' + i).html(this.repP1)
                // $('#cell' + i).css('background-color', this.player1Color)
            } else if (this.board[x][y] == this.player2) {
                $('#cell' + i).html(this.repP2)
                // $('#cell' + i).css('background-color', this.player2Color)
            } else {
                $('#cell' + i).html(this.empty)
                // $('#cell' + i).css('background-color', 'white')
            }
        }
    }

    /** 
     * @desc Getter id dari koordinat
     * @param {integer} x
     * @param {integer} y
     */
    getIdfromCoor(x, y) {
        return y * this.size + x;
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
     * @desc Mengembalikan player 1
     */
    getPlayer1() {
        return this.player1
    }

    /**
     * @desc Mengembalikan player 2
     */
    getPlayer2() {
        return this.player2
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
        for (var i = 0; i < 10; i++) {
            if (!this.isOnHome(this.player2, this.player1Pieces[i])) {
                player1Win = false
                break
            }
        }

        for (var i = 0; i < 10; i++) {
            if (!this.isOnHome(this.player1, this.player2Pieces[i])) {
                player2Win = false
                break
            }
        }

        if (player1Win) return 1
        if (player2Win) return 2
        return 0
    }

    /**
     * @desc Mengecek apakah bidak berada di rumah pemain
     * @param {char} player 
     * @param {Coordinate} coord 
     */
    isOnHome(player, coord) {
        var base = 5

        if (this.size == 10) {
            base = 6
        } else if (this.size == 16) {
            base = 7
        }

        if (player == 'P' || player == 'K') {
            /* Corner case on the tip of the base */
            if (coord.equal(new Coordinate(0, this.size - base)) || coord.equal(new Coordinate(base, 0))) {
                return false
            }
            return coord.getY() >= coord.getX() + this.size - base
        } else {
            /* Corner case on the tip of the base */
            if (coord.equal(new Coordinate(this.size - base, 0)) || coord.equal(new Coordinate(0, base))) {
                return false
            }
            return coord.getY() <= coord.getX() - this.size + base
        }
    }
}