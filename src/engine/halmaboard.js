/**
 * @desc Kelas HalmaBoard: digunakan untuk merepresentasikan papan permainan halma
 */
class HalmaBoard {

    /**
     * @desc Konstuktor
     * @param {integer} size 
     * @param {string} mode 
     * @param {string} pcolor 
     */
    constructor(size, mode, pcolor) {
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

        /* Rep players here */
        var red = '<div ><svg width="80" height="80"><circle cx="40" cy="40" r="30" stroke="rgb(240,74,74)" stroke-width="8" fill="rgb(193,32,32)" /></svg></div>'
        var green = '<div ><svg width="80" height="80"><circle cx="40" cy="40" r="30" stroke="rgb(30,185,92)" stroke-width="8" fill="rgb(23,154,60)" /></svg></div>'
        this.empty = '<div class="emp"></div>'
        if (bsize == 16) {
            red = '<div ><svg width="60" height="60"><circle cx="30" cy="30" r="25" stroke="rgb(240,74,74)" stroke-width="5" fill="rgb(193,32,32)" /></svg></div>'
            green = '<div ><svg width="60" height="60"><circle cx="30" cy="30" r="25" stroke="rgb(30,185,92)" stroke-width="5" fill="rgb(23,154,60)" /></svg></div>'
            this.empty = '<div class="emp16"></div>'
        }

        /* Pick player color */
        this.repP1 = (pcolor == "red") ? red : green
        this.repP2 = (pcolor == "red") ? green : red

    }

    /**
     * @desc Inisialisasi papan dengan bidak pemain
     */
    initBoard() {
        let xHomePoint = 0
        let yHomePoint = this.size - 1
        let xEnemyPoint = this.size - 1
        let yEnemyPoint = 0
        var base = (this.size >= 10) ? 5 : 4;

        $('#board').html(function (size) {
            let cellid = 0;
            let content = "";
            for (let i = 0; i < size; i++) {
                content = content.concat("<tr>");
                for (let j = 0; j < size; j++) {
                    content = content.concat("<td id=\"cell");
                    content = content.concat(cellid);
                    content = content.concat("\"> </td>");
                    cellid += 1;
                }
                content = content.concat("</tr>");
            }
            return content;
        }(this.size))

        var offset = base
        var p1 = pcolor;
        var p2 = (pcolor == "red") ? "green" : "red";

        for (var i = 0; i < base; i++) {
            if (i > 0 && this.size == 16) {
                this.board[xHomePoint + i][yHomePoint - offset] = this.player1
                this.player1Pieces.push(new Coordinate(xHomePoint + i, yHomePoint - offset))
                $('#cell' + this.getIdfromCoor(xHomePoint + i, yHomePoint - offset)).toggleClass(p1);
                this.board[xEnemyPoint - i][yEnemyPoint + offset] = this.player2
                this.player2Pieces.push(new Coordinate(xEnemyPoint - i, yEnemyPoint + offset))
                $('#cell' + this.getIdfromCoor(xEnemyPoint - i, yEnemyPoint + offset)).toggleClass(p2);
            }
            for (var j = 0; j < offset; j++) {
                /* Render ke papan */
                this.board[xHomePoint + i][yHomePoint - j] = this.player1
                this.board[xEnemyPoint - i][yEnemyPoint + j] = this.player2
                $('#cell' + this.getIdfromCoor(xHomePoint + i, yHomePoint - j)).toggleClass(p1);
                $('#cell' + this.getIdfromCoor(xEnemyPoint - i, yEnemyPoint + j)).toggleClass(p2);
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
            let x = i % this.size
            let y = Math.floor(i / this.size)
            if (this.board[x][y] == this.player1) {
                $('#cell' + i).html(this.repP1)
            } else if (this.board[x][y] == this.player2) {
                $('#cell' + i).html(this.repP2)
            } else {
                $('#cell' + i).html(this.empty)
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
        if (player == 'P' || player == 'K') {
            return [].concat(this.player1Pieces)
        }
        else if (player == 'C') {
            return [].concat(this.player2Pieces)
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
        var cc = new HalmaBoard(this.size, this.mode, this.pcolor)
        cc.board = []

        var innerRow
        for (var i = 0; i < this.size; i++) {
            innerRow = []
            for (var j = 0; j < this.size; j++) {
                innerRow.push(this.getBoard()[i][j]);
            }
            cc.board.push(innerRow);
        }

        cc.player1 = this.player1
        cc.player2 = this.player2
        cc.player1Pieces = [].concat(this.player1Pieces)
        cc.player2Pieces = [].concat(this.player2Pieces)
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

        if(player == this.player1) {
            for (var i = 0; i < this.player1Pieces.length; i++) {
                if(this.player1Pieces[i].equal(new Coordinate(xBefore, yBefore))) {
                    this.player1Pieces[i] = new Coordinate(xAfter, yAfter)
                }
            }
        } else {
            for (var i = 0; i < this.player2Pieces.length; i++) {
                if(this.player2Pieces[i].equal(new Coordinate(xBefore, yBefore))) {
                    this.player2Pieces[i] = new Coordinate(xAfter, yAfter)
                }
            }
        }
    }

    objFunc(player) {
        /* Fungsi objektif */
        var xEnemyBase = (player == this.player1) ? this.size - 1 : 0
        var yEnemyBase = (player == this.player1) ? 0 : this.size - 1
        var xHomeBase = (player == this.player1) ? 0 : this.size - 1
        var yHomeBase = (player == this.player1) ? this.size - 1 : 0
        var playerPieces = (player == this.player1) ? this.player1Pieces : this.player2Pieces
        var enemyPieces = (player == this.player1) ? this.player2Pieces : this.player1Pieces
        var enemy = (player == this.player1) ? this.player2 : this.player1

        var sum = 0
        for (var i = 0; i < playerPieces.length; i++) {
            sum += -Math.abs(playerPieces[i].getX() - xEnemyBase) - Math.abs(playerPieces[i].getY() - yEnemyBase) + Math.abs(playerPieces[i].getX() - xHomeBase) + Math.abs(playerPieces[i].getY() - yHomeBase) + 4*this.size + 30*this.isOnHome(enemy, playerPieces[i])
            sum -= 4*this.size - Math.abs(enemyPieces[i].getX() - xEnemyBase) - Math.abs(enemyPieces[i].getY() - yEnemyBase) + 30*this.isOnHome(player, playerPieces[i])
        }

        return sum
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
        var base = 4

        if (this.size == 10) {
            base = 5
        } else if (this.size == 16) {
            base = 7
        }

        if ((player == 'P' || player == 'K')) {
            /* Corner case on the tip of the base */
            if ((coord.equal(new Coordinate(0, this.size - base)) || coord.equal(new Coordinate(base, 0))) && this.size == 16) {
                return false
            }
            return coord.getX() <= coord.getY() - this.size + base
        } else {
            /* Corner case on the tip of the base */
            if ((coord.equal(new Coordinate(this.size - base, 0)) || coord.equal(new Coordinate(0, base))) && this.size == 16) {
                return false
            }
            return coord.getX() >= coord.getY() + this.size - base
        }
    }
}