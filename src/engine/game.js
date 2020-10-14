/**
 * @desc Kelas Game: merepresentasikan flow permainan
 */
class Game {

    /**
     * @desc Konstruktor
     * @param {char} mode 
     * @param {integer} tlimit 
     * @param {integer} bsize 
     */
    constructor(mode, tlimit, bsize=16) {
        this.mode = mode
        this.bsize = bsize
        this.tlimit = tlimit

        this.gameBoard = new HalmaBoard(bsize)
        
        this.players = []
        if(this.mode = 'P') {
            this.players.push('P')
        } else {
            this.players.push('C')
        }
        this.players.push('C')

        this.actionBuffer = []
        this.hopBuffer = []
        this.playerTurn = this.players[0]
    }

    /**
     * @desc Listen aksi yang diinput oleh pemain untuk diproses
     * @param {integer} x 
     * @param {integer} y 
     */
    async actionListener(x, y) {
        let step = new Coordinate(x, y)
        this.actionBuffer.push(step)
        if(this.actionBuffer.length == 2) {
            let act = new Action(this.playerTurn, this.actionBuffer[0], this.actionBuffer[1])

            if(!act.isLegal()) {
                /* NOT LEGAL */
                return
            }
    
            this.gameBoard.updateBoard(act)
            this.actionBuffer = []
            this.run()
        }
    }

    /**
     * @desc Runner permainan
     */
    run() {
        /* Main Flow */
    }

}

/* Get param */
let mode = localStorage.getItem('mode')
let tlimit = localStorage.getItem('tlimit')
let bsize = localStorage.getItem('bsize')

/* Init game */
let thisGame = new Game(mode, tlimit, bsize)

/* If player mode, initialize listeners on cells */
if(mode === 'P') {
    for(var i = 1; i <= bsize; i++) {
        $('#cell' + i).on('click', () => 
            thisGame.actionListener( 
                $('#cell' + i).attr('x'),
                $('#cell' + i).attr('y')
            ))
    }
}