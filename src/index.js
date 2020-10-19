var bsize
/* these fields not implemented yet */
var mode
var tlimit
var p1color
var p2color

$('#inpform input').on('change', function() {
    bsize = $('input[name=boardSize]:checked', '#inpform').val()
    p1color = $('input[name=p1color]:checked', '#inpform').val()
    p2color = $('input[name=p2color]:checked', '#inpform').val()
})

function redirectAndStore() {
    // placeholder block buat err message
    var err = p1color == p2color || p1color == undefined || p2color == undefined || bsize == undefined || mode == undefined || tlimit == undefined || tlimit < 0
    if(err) {
        alert('ERROR')
        return
    }

    localStorage.setItem('bsize', bsize)
    localStorage.setItem('p1color', p1color)
    localStorage.setItem('p2color', p2color)
    localStorage.setItem('mode', mode)
    localStorage.setItem('tlimit', tlimit)

    /* for testing only */
    console.log(localStorage.getItem('bsize'))
    console.log(localStorage.getItem('p1color'))
    console.log(localStorage.getItem('p2color'))
    console.log(localStorage.getItem('mode'))
    console.log(localStorage.getItem('tlimit'))

    /* redirect to board.html */
    window.location.href = "./board.html";
}
