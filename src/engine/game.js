function initAI() {
    if(mode == 'PC' || mode == 'CCL') {
        /* MinMaxAI = new HalmaAI() */
    } else if(mode == 'PCL' || mode == 'CCL') {
        /* MinMaxAILS = new HalmaAILS() */
    }
}

function initTurn() {
    if(mode == 'PC' || mode == 'PCL') {
        turn = 'P'
    } else {
        turn = 'C1'
    }

    /* start timer */
    timer.start()
    alert("Time started!")
}

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

function actionListener(ncell) {
    /* Convert to coords */
    let x = ncell % 4
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
        
        /* Update board */
        gameBoard.updateBoard(act)
        
        /* If not hopping, proceed to next turn */
        if(!act.isHopping()) {
            nextTurn()
        }
    }
}

function nextTurn() {
    /* Stop timer */
    timer.stop()

    if(mode == 'PC' || mode == 'PCL') {
        turn = (turn == 'P') ? 'C2' : 'P'
    } else {
        turn = (turn == 'C1') ? 'C2' : 'C1'
    }

    /* Start timer again */
    timer.start()

    /* Return if player turn */
    if(turn == 'P') return

    /* AI move */
    if(turn == 'C1') {
        /* AI process */
    } else {
        /* AI process */
    }
}

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
var gameBoard = new HalmaBoard(bsize)
var actionBuffer = []
var timer = new Timer(nextTurn, tlimit)

/* Init game */
initGame()