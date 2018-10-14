let gameCode
const game = io()

function createGame () {
  gameCode = (Math.floor(Math.random() * 2176782335)).toString(36)
  console.log(gameCode)
  // Va a mandar al servidor el evento para crear un nuevo juego con un codigo unico en base 36
  game.emit('createGame', { 'gameCode': gameCode })
  document.getElementById('login').style.display = 'none'
  document.getElementById('game-code').innerHTML = `Codigo de juego: ${gameCode}`
}

// Event Listeners
document.getElementById('btn-create-game').addEventListener('click', createGame)

/*
game.on('servedCards', (cards) => {
  console.log(cards)
})

function playCard (card) {
  console.log(`carta jugada ${card}`)
  game.emit('cardPlayed', card)
} */
