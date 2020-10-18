
/**
 * @desc Inisialisasi AI yang bermain
 */
function initAI() {
    if(mode == 'PC' || mode == 'CCL') {
        /* MinMaxAI = new HalmaAI() */
    } else if(mode == 'PCL' || mode == 'CCL') {
        /* MinMaxAILS = new HalmaAILS() */
    }
}

/**
 * @desc Memulai permainan dengan menentukan giliran dan start timer: aktif saat tekan 'START GAME'
 */
function initTurn() {
    if(mode == 'PC' || mode == 'PCL') {
        turn = 'P'
    } else {
        turn = 'K'
    }

    /* start timer */
    timer.start()
    alert("Time started!")
}

/**
 * @desc Inisialisasi listener untuk pemain manusia
 */
function initListener() {
    var arr = []
    for(var i = 0; i < bsize*bsize; i++) {
        arr.push(i)
    }

    function listen(item, _) {
        $('#cell' + item).on('click', () => actionListener(item))
    }

    arr.forEach(listen)
}

/**
 * @desc Proses masukan aksi oleh pemain manusia
 * @param {integer} ncell 
 */
function actionListener(ncell) {
    /* Convert to coords */
    let x = ncell % 8
    let y = Math.floor(ncell/8)

    console.log(x, y)

    /* Block if not player turn */
    if(turn != 'P') {
        console.log("THIS IS NOT YOUR TURN!")
        return
    }

    let step = new Coordinate(x, y)
    actionBuffer.push(step)
    if(actionBuffer.length == 2) {
        let act = new Action(turn, actionBuffer[0], actionBuffer[1])

        actionBuffer = []
        if(!act.isLegal(gameBoard)) {
            console.log("NOT LEGAL")
            return
        }

        if(hopHistory.length > 0) {
            /* Kalau yang dijalankan bukan bidak sebelumnya, NOT LEGAL */
            if(!hopHistory[hopHistory.length - 1].equal(act.getBeforeCoord())) {
                console.log('NOT LEGAL')
                return
            }
        }
        
        /* Update board */
        gameBoard.updateBoard(act)
        /* Render board */
        gameBoard.renderBoard()
        
        /* If not hopping, proceed to next turn */
        if(!act.isHopping(gameBoard)) {
            nextTurn()
        } else { /* If hopping, push to history to compare to next hop */
            hopHistory.push(act.getAfterCoord())
        }
    }
}

/**
 * @desc Melakukan pergantian giliran permainan
 */
function nextTurn() {
    /* Stop timer, bersihkan actionBuffer */
    timer.stop()
    actionBuffer = []
    hopHistory = []

    if(gameBoard.isFinalState() > 0) {
        endGame(gameBoard.isFinalState())
        return
    }

    if(mode == 'PC' || mode == 'PCL') {
        turn = (turn == 'P') ? 'C' : 'P'
    } else {
        turn = (turn == 'K') ? 'C' : 'K'
    }

    console.log('NEXT TURN:' + turn)

    /* Start timer again */
    timer.start()

    /* Return if player turn */
    if(turn == 'P') return

    /* AI move */
    if(turn == 'K') {
        /* AI process */
    } else {
        /* AI process */
    }
}

/**
 * @desc Mengakhiri permainan dengan pemenang
 * @param {integer} winner 
 */
function endGame(winner) {
    timer.stop()
    alert("Pemenangnya adalah Player" + winner +"!")
}

/**
 * @desc Memulai permainan
 */
function initGame() {
    initAI()
    if(mode == 'PC' || mode == 'PCL') {
        initListener()
    }

    /* for testing purposes */
    initTurn()
}

/* Get param */
// var mode = localStorage.getItem('mode')
// var tlimit = localStorage.getItem('tlimit')
// var bsize = localStorage.getItem('bsize')
var mode = 'PC'
var tlimit = 6000
var bsize = 8

/* Inti components */
var gameBoard = new HalmaBoard(bsize, mode)
gameBoard.initBoard()
gameBoard.renderBoard()
var actionBuffer = []
var hopHistory = []
var timer = new Timer(nextTurn, tlimit)

/* Init game */
initGame()