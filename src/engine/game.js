
/**
 * @desc Inisialisasi AI yang bermain
 */
function initAI() {
    if (mode == 'PC' || mode == 'CCL') {
        AI1 = new HalmaAI(gameBoard, 2, 2, 1)
    } else if (mode == 'PCL' || mode == 'CCL') {
        /* MinMaxAILS = new HalmaAILS() */
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
    $('#endTurn').on('click', () => {
        if (turn != 'P') {
            console.log("THIS IS NOT YOUR TURN!")
            // Testing Purposes
            // nextTurn()
        }
        else {
            nextTurn()
        }
    })
}

/**
 * @desc Proses masukan aksi oleh pemain manusia
 * @param {integer} ncell 
 */
function actionListener(ncell) {
    /* Convert to coords */
    let x = ncell % 8
    let y = Math.floor(ncell / 8)

    console.log(x, y)

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
    if (turn == 'K') {
        /* AI process */
    } else {
        AI1.setBoard(gameBoard)
        var aiMove = AI1.getMove('minimax-only')
        console.log(aiMove)
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


/* Get param */
// var mode = localStorage.getItem('mode')
// var tlimit = localStorage.getItem('tlimit')
var bsize = localStorage.getItem('bsize')
var mode = 'PC'
var tlimit = 6000
var bsize = 16

/* Test pass variable */
console.log(localStorage.getItem('bsize'))
console.log(localStorage.getItem('p1color'))
console.log(localStorage.getItem('p2color'))

/* Rep players here */
var repP1 = '<div ><svg width="80" height="80"><circle cx="40" cy="40" r="30" stroke="rgb(240,74,74)" stroke-width="8" fill="rgb(193,32,32)" /></svg></div>'
var repP2 = '<div ><svg width="80" height="80"><circle cx="40" cy="40" r="30" stroke="rgb(30,185,92)" stroke-width="8" fill="rgb(23,154,60)" /></svg></div>'
var empty = '<div class="emp"></div>'

if (bsize == 16) {
    repP1 = '<div ><svg width="60" height="60"><circle cx="30" cy="30" r="25" stroke="rgb(240,74,74)" stroke-width="5" fill="rgb(193,32,32)" /></svg></div>'
    repP2 = '<div ><svg width="60" height="60"><circle cx="30" cy="30" r="25" stroke="rgb(30,185,92)" stroke-width="5" fill="rgb(23,154,60)" /></svg></div>'
    empty = '<div class="emp16"></div>'
}

/* Init board components */
var gameBoard = new HalmaBoard(bsize, mode, repP1, repP2, empty)
gameBoard.initBoard()
gameBoard.renderBoard()

/* Init buffers and timer */
var actionBuffer = []
var hopHistory = []
var sec = tlimit;
var counter = new Timer(renderTimer, 100);
// counter.start();
var timer = new Timer(nextTurn, tlimit)

/* Init AI vars */
var AI1 = null
var AI2 = null

/* Init game */
initGame()