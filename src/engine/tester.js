class Hehe {
    constructor(){
        this.value = 0
    }

    printer(uwuz) {
        this.value += 1
        let x = uwuz % 8
        let y = Math.floor(uwuz/8)
        console.log(x, y)
    }
}

let h = new Hehe()
console.log('huehue')

var bsize = 8
var arr = []
for(var i = 0; i < bsize*bsize; i++) {
    arr.push(i)
}

arr.forEach(listen)

function listen(item, _) {
    $('#cell' + item).on('click', () => h.printer(item))
}