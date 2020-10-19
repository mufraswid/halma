var b = new HalmaBoard(8, 'PC', 'P', 'C')
b.initBoard()

// console.log(
//     a.getAllActions(new Coordinate(0, 6), b, 2)
// )

var a = new HalmaAI(b, 2)
console.log(
    a.player
)