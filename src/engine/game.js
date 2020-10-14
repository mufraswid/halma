/**
 * @desc Kelas Game: merepresentasikan flow permainan
 */
class Game {

    /**
     * @desc Konstruktor
     * @param {string} mode Keterangan => PC: Pemain-AI, PCL: Pemain-AILocalSearch, CCL: AI-AILocalSearch
     * @param {integer} tlimit 
     * @param {integer} bsize 
     */
    constructor(mode, tlimit, bsize=16) {
        this.mode = mode
        this.bsize = bsize
        this.tlimit = tlimit

        this.gameBoard = new HalmaBoard(this.bsize)

        this.actionBuffer = []
        this.timer = new Timer(this.nextTurn(), this.tlimit)
        
        this.initAI()
        this.initTurn()
    }

    /**
     * @desc Inisialisasi AI yang diperlukan
     */
    initAI() {
        if(this.mode === 'PC' || this.mode === 'CCL') {
            /* this.MinMaxAI = new HalmaAI() */
        } else if(this.mode === 'PCL' || this.mode === 'CCL') {
            /* this.MinMaxAILS = new HalmaAILS() */
        }
    }

    /**
     * @desc Inisialisasi giliran pertama game
     */
    initTurn() {
        if(this.mode === 'PC' || this.mode === 'PCL') {
            this.turn = 'P'
        } else {
            this.turn = 'C1'
        }

        /* start timer */
        this.timer.start()
    }

    /**
     * @desc Listen aksi yang diinput oleh pemain untuk diproses
     * @param {integer} x 
     * @param {integer} y 
     */
    actionListener(x, y) {
        /* Block if not player turn */
        if(this.turn !== 'P') return

        let step = new Coordinate(x, y)
        this.actionBuffer.push(step)
        if(this.actionBuffer.length == 2) {
            let act = new Action(this.turn, this.actionBuffer[0], this.actionBuffer[1])

            this.actionBuffer = []
            if(!act.isLegal()) {
                /* NOT LEGAL */
                return
            }
    
            this.gameBoard.updateBoard(act)
            /* render board */
        }
    }

    /**
     * @desc Melakukan ganti giliran di permainan
     */
    nextTurn() {
        /* Stop running timer */
        this.timer.stop()

        if(this.mode === 'PC' || this.mode === 'PCL') {
            this.turn = (this.turn === 'P') ? 'C2' : 'P'
        } else {
            this.turn = (this.turn === 'C1') ? 'C2' : 'C1'
        }

        /* Start timer again */
        this.timer.start()

        /* Return if player turn */
        if(this.turn === 'P') return

        /* AI move */
        if(this.turn === 'C1') {
            /* AI process */
        } else {
            /* AI process */
        }
    }

}

/* Get param */
let mode = localStorage.getItem('mode')
let tlimit = localStorage.getItem('tlimit')
let bsize = localStorage.getItem('bsize')

/* Init game */
let thisGame = new Game(mode, tlimit, bsize)

/* Bila mode pemain, open listener */
if(mode === 'PC' || mode === 'PCL') {
    for(var i = 1; i <= bsize; i++) {
        $('#cell' + i).on('click', () => 
            thisGame.actionListener( 
                $('#cell' + i).attr('x'),
                $('#cell' + i).attr('y')
            )
        )
    }
}