const game = io()

function playCard (card) {
  console.log(`carta jugada ${card}`)
  game.emit('cardPlayed', card)
}
