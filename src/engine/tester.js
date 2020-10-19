var b = new HalmaBoard(8, 'PC', 'P', 'C')
b.initBoard()
var a = new HalmaAI(b, 2, 'P', 'C')

console.log(
    a.getAllActions(new Coordinate(0, 6), b, 'P')
)