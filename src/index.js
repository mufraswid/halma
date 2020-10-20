var bsize
var mode
var tlimit
var pcolor
// var p2color no longer implemented

$('#inpform input').on('change', function () {
    bsize = $('input[name=boardSize]:checked', '#inpform').val()
    pcolor = $('input[name=pcolor]:checked', '#inpform').val()
    mode = $('input[name=mode]:checked', '#inpform').val()
    tlimit = $('input[name=tlimit]:input', '#inpform').val()
    // p2color = $('input[name=p2color]:checked', '#inpform').val() no longer implemented
})

function redirectAndStore() {
    // placeholder block buat err message
    console.log(bsize)
    console.log(pcolor)
    console.log(mode)
    console.log(tlimit)
    var err = pcolor == undefined || bsize == undefined || mode == undefined || tlimit == undefined || tlimit < 0
    if (err) {
        alert('ERROR')
        return
    }

    localStorage.setItem('bsize', bsize)
    localStorage.setItem('pcolor', pcolor)
    localStorage.setItem('mode', mode)
    localStorage.setItem('tlimit', tlimit)

    /* for testing only */
    console.log(localStorage.getItem('bsize'))
    console.log(localStorage.getItem('pcolor'))
    console.log(localStorage.getItem('mode'))
    console.log(localStorage.getItem('tlimit'))

    /* redirect to board.html */
    window.location.href = "./board.html";
}
