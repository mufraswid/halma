/**
 * @desc Inisialisasi AI yang bermain
 */
function initAI() {
    if (mode == 'PC' || mode == 'PCL') {
        AI1 = new HalmaAI(gameBoard, 3, 'C', 'P')
    }
    else if (mode == 'CCL') {
        AI1 = new HalmaAI(gameBoard, 3, 'C', 'K')
        AI2 = new HalmaAI(gameBoard, 3, 'K', 'C')
    }
}

/**
 * @desc Memulai permainan dengan menentukan giliran dan start timer: aktif saat tekan 'START GAME'
 */
function initTurn() {
    if (mode == 'PC' || mode == 'PCL') {
        turn = 'P'
    } else {
        turn = 'K'
    }

    /* start timer */
    timer.start()
    alert("Time started!")
    renderTurn()
}

/**
 * @desc Inisialisasi listener untuk pemain manusia
 */
function initListener() {
    var arr = []
    for (var i = 0; i < bsize * bsize; i++) {
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
    let x = ncell % bsize
    let y = Math.floor(ncell / bsize)

    /* Block if not player turn */
    if (turn != 'P') {
        console.log("THIS IS NOT YOUR TURN!")
        return
    }

    let step = new Coordinate(x, y)
    actionBuffer.push(step)
    if (actionBuffer.length == 2) {
        let act = new Action(turn, actionBuffer[0], actionBuffer[1])

        actionBuffer = []
        if (!act.isLegal(gameBoard)) {
            console.log("NOT LEGAL")
            return
        }

        if (hopHistory.length > 0) {
            /* Kalau yang dijalankan bukan bidak sebelumnya, NOT LEGAL */
            if (!hopHistory[hopHistory.length - 1].equal(act.getBeforeCoord()) || !act.isHopping(gameBoard)) {
                console.log('NOT LEGAL')
                return
            }
        }

        /* Update board */
        gameBoard.updateBoard(act)
        /* Render board */
        gameBoard.renderBoard()

        /* If not hopping, proceed to next turn */
        if (!act.isHopping(gameBoard)) {
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
    counter.stop()
    timer.stop()
    sec = tlimit
    actionBuffer = []
    hopHistory = []

    if (gameBoard.isFinalState() > 0) {
        endGame(gameBoard.isFinalState())
        return
    }

    if (mode == 'PC' || mode == 'PCL') {
        turn = (turn == 'P') ? 'C' : 'P'

    } else {
        turn = (turn == 'K') ? 'C' : 'K'
    }

    renderTurn()

    console.log('NEXT TURN:' + turn)

    /* Start timer again */
    counter.start()
    timer.start()

    /* Return if player turn */
    if (turn == 'P') return

    /* AI move */
    var starttime = new Date()
    if (turn == 'K') {
        /* AI process */
        AI2.setBoard(gameBoard)
        var aiMove = AI2.getMove('minimax-localsearch')
        time1.push((new Date() - starttime) / 1000)
        gameBoard.updateBoard(aiMove)
        gameBoard.renderBoard()
    } else {
        AI1.setBoard(gameBoard)
        if (mode == 'PCL') {
            var aiMove = AI1.getMove('minimax-localsearch')
        }
        else {
            var aiMove = AI1.getMove('minimax-only')
        }
        time2.push((new Date() - starttime) / 1000)
        gameBoard.updateBoard(aiMove)
        gameBoard.renderBoard()

    }
}

/**
 * @desc Mengakhiri permainan dengan pemenang
 * @param {integer} winner 
 */
function endGame(winner) {
    timer.stop()
    alert("Pemenangnya adalah Player" + winner + "!")

    /* Analisis waktu */
    var sum1 = 0
    var sum2 = 0
    var mean1 = 0
    var mean2 = 0
    for (var i = 0; i < time1.length; i++) {
        sum1 += time1[i]
    }
    for (var i = 0; i < time2.length; i++) {
        sum2 += time2[i]
    }
    if (time1.length > 0) {
        mean1 = sum1 / time1.length
    }
    if (time2.length > 0) {
        mean2 = sum2 / time2.length
    }
    console.log("sum1", sum1)
    console.log("sum2", sum2)
    console.log("mean1", mean1)
    console.log("mean2", mean2)
}

/**
 * @desc Memulai permainan
 */
function initGame() {
    initAI()
    if (mode == 'PC' || mode == 'PCL') {
        initListener()
    }

    /* for testing purposes */
    initTurn()
}

/**
 * @desc Render timer ke papan
 */
function renderTimer() {
    sec -= 100
    var out = sec / 1000
    $('#timeDisplay').html(out.toFixed(1))
}
/**
 * @desc Render turn ke papan
 */
function renderTurn() {
    var disp = ""
    if (mode == 'PC' || mode == 'PCL') {
        disp = (turn == 'P') ? 'Player' : 'Computer'

    } else {
        disp = (turn == 'C') ? 'Minimax' : 'Local Search'
    }
    $('#turnDisplay').html(disp)
}


/* Test pass variable */
// console.log(localStorage.getItem('bsize'))
// console.log(localStorage.getItem('pcolor'))
// console.log(localStorage.getItem('mode'))
// console.log(localStorage.getItem('tlimit'))

/* Get param */
var bsize = localStorage.getItem('bsize')
var pcolor = localStorage.getItem('pcolor')
var tlimit = localStorage.getItem('tlimit') * 1000
var mode = localStorage.getItem('mode')
//var mode = 'PC'


/* Init board components */
var gameBoard = new HalmaBoard(bsize, mode, pcolor)
gameBoard.initBoard()
gameBoard.renderBoard()

/* Init buffers and timer */
var actionBuffer = []
var hopHistory = []
var sec = tlimit;
var counter = new Timer(renderTimer, 100);
var timer = new Timer(nextTurn, tlimit)

/* Init AI vars */
var AI1 = null
var AI2 = null

/* Init time buffer */
var time1 = []
var time2 = []

/* Init game */
initGame()