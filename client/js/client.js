let gameCode
let userCode
const game = io()

function createGame () {
  gameCode = (Math.floor(Math.random() * 2176782335)).toString(36)
  console.log(gameCode)
  // Va a mandar al servidor el evento para crear un nuevo juego con un codigo unico en base 36
  game.emit('createGame', { 'gameCode': gameCode })
  document.getElementById('login').style.display = 'none'
  document.getElementById('game-code').innerHTML = `Codigo de juego: ${gameCode}`
  document.getElementById('game').style.display = 'block'
}

function joinGame () {
  while (userCode == null || userCode === '') {
    userCode = prompt('Nombre/Apodo', (Math.floor(Math.random() * 2176782335)).toString(36))
  }
  gameCode = document.getElementById('input-game-code').value
  game.emit('joinGame', { 'gameCode': gameCode, 'player': userCode })
  document.getElementById('login').style.display = 'none'
  document.getElementById('player').style.display = 'block'
}

game.on(gameCode, (data) => {
  console.log(data)
})

// Event Listeners
document.getElementById('btn-create-game').addEventListener('click', createGame)
document.getElementById('btn-join-game').addEventListener('click', joinGame)

/*
game.on('servedCards', (cards) => {
  console.log(cards)
})

function playCard (card) {
  console.log(`carta jugada ${card}`)
  game.emit('cardPlayed', card)
} */
