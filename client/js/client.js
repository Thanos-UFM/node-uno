let gameCode
let userCode
const game = io()

function createGame () {
  gameCode = (Math.floor(Math.random() * 2176782335)).toString(36)
  // Va a mandar al servidor el evento para crear un nuevo juego con un codigo unico en base 36
  game.emit('createGame', { 'gameCode': gameCode })
  document.getElementById('login').style.display = 'none'
  document.getElementById('game-code').innerHTML = `Codigo de juego: ${gameCode}`
  document.getElementById('game').style.display = 'block'

  game.on('playerJoined', (data) => {
    if (data.gameCode === gameCode) {
      document.getElementById('players').innerHTML += `<li>${data.player}</li>`
    }
  })
}

function joinGame () {
  while (userCode == null || userCode === '') {
    userCode = prompt('Nombre/Apodo', (Math.floor(Math.random() * 2176782335)).toString(36))
  }
  gameCode = document.getElementById('input-game-code').value
  game.emit('joinGame', { 'gameCode': gameCode, 'player': userCode })
  document.getElementById('login').style.display = 'none'
  document.getElementById('player').style.display = 'block'
  document.getElementById('player-id').innerHTML = `Codigo de jugador: ${userCode}`

  game.on(userCode, (data) => {
    data.forEach((item, index) => {
      let color
      switch (item.color) {
        case 0:
          color = 'red'
          break
        case 1:
          color = 'blue'
          break
        case 2:
          color = 'green'
          break
        case 3:
          color = 'yellow'
          break
        case 4:
          color = 'black'
          break
      }
      document.getElementById('cards').innerHTML += `
      <li>
        <button onclick="playCard(${item.value}, ${item.color})" class="card" style="background-color: ${color}; color: white">${item.value}</button>
      </li>`
    })
    console.log(data)
    // document.getElementById('cards').innerHTML += `<li>${data.player}</li>`
  })
}

function startGame () {
  game.emit('startGame', { 'gameCode': gameCode })
}

function playCard (cardValue, cardColor) {
  const card = { color: cardColor, value: cardValue }
  console.log('carta jugada', card)
  // game.emit('cardPlayed', card)
}

// Event Listeners
document.getElementById('btn-create-game').addEventListener('click', createGame)
document.getElementById('btn-join-game').addEventListener('click', joinGame)
document.getElementById('btn-start-game').addEventListener('click', startGame)
