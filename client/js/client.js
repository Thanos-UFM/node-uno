let gameCode
let userCode
let toPlay
let joined = false
const game = io()

function mainMenu () {
  document.getElementById('main').style.display = 'none'
  document.getElementById('login').style.display = 'block'
}

function createGame () {
  gameCode = (Math.floor(Math.random() * 1679615)).toString(36)
  // Va a mandar al servidor el evento para crear un nuevo juego con un codigo unico en base 36
  game.emit('createGame', { 'gameCode': gameCode })
  document.getElementById('login').style.display = 'none'
  document.getElementById('game-code').innerHTML = `Codigo de juego: ${gameCode}`
  document.getElementById('game').style.display = 'block'
  document.getElementById('game-title').style.display = 'none'

  game.on('playerJoined', (data) => {
    console.log('player joined', data)
    if (data.players.length > 1) {
      document.getElementById('btn-start-game').style.display = 'initial'
    }
    document.getElementById('players').innerHTML = ''
    if (data.gameCode === gameCode) {
      data.players.forEach((item, index) => {
        document.getElementById('players').innerHTML += `<li>${item.nickname}, <b>(${item.cards.length})</b></li>`
      })
    }
  })

  game.on(gameCode, (data) => {
    document.getElementById('players').innerHTML = ''
    data.players.forEach((item, index) => {
      if (item.cards.length === 0) {
        showAlert(`¡${item.nickname} ha ganado!`, 'La partida se reiniciara y todos los jugadores tendran 7 cartas otra vez')
        game.emit('restartGame', { 'gameCode': gameCode })
      } else {
        document.getElementById('players').innerHTML += `<li>${item.nickname}, <b>(${item.cards.length})</b></li>`
      }
    })
  })
}

function joinGame () {
  while (userCode == null || userCode === '') {
    userCode = prompt('Nombre/Apodo', (Math.floor(Math.random() * 2176782335)).toString(36))
  }
  gameCode = (document.getElementById('input-game-code').value).toLowerCase()
  game.emit('joinGame', { 'gameCode': gameCode, 'player': userCode })

  game.on('playerJoined', (data) => {
    console.log('player joined', data)
    if (joined === false) {
      if (data.gameCode === gameCode) {
        document.getElementById('login').style.display = 'none'
        document.getElementById('player').style.display = 'block'
        document.getElementById('player-id').innerHTML = `Jugador: ${userCode}`

        joined = true

        printCards(data)

        gameEvents()
      } else if (!data) {
        console.log(data)
        alert('Juego no exite')
      }
    }
  })
}

function fishCard () {
  game.emit('fishCard', { 'gameCode': gameCode, 'player': userCode })
}

function printCards (game) {
  console.log('print', game)
  const cards = document.getElementsByClassName('card')
  document.getElementById('cards').innerHTML = ''
  game.players.forEach((player, ind) => {
    if (player.nickname === userCode) {
      player.cards.forEach((card, index) => {
        let color
        switch (card.color) {
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
        let value
        value = card.value
        switch (card.value) {
          case 10:
            value = '+2'
            break
          case 11:
            value = '🚫'
            break
          case 14:
            value = '+4'
            break
        }
        document.getElementById('cards').innerHTML += `
        <li>
          <button onclick="playCard(${card.value}, ${card.color})" class="card ${color}" disabled>${value}</button>
        </li>`
      })
    }
  })

  if (game.turn > -1) {
    document.getElementById('test').innerHTML = `Turno de ${game.players[game.turn].nickname}`
    if (game.players[game.turn].nickname === userCode) {
      for (let i = 0; i < cards.length; i++) {
        cards[i].disabled = false
        document.getElementById('btn-fish-card').disabled = false
      }
    } else {
      for (let i = 0; i < cards.length; i++) {
        cards[i].disabled = true
        document.getElementById('btn-fish-card').disabled = true
      }
    }
  }
}

function startGame () {
  game.emit('startGame', { 'gameCode': gameCode })
  document.getElementById('btn-start-game').disabled = true
  document.getElementById('game-title').style.display = 'block'
  gameEvents()
}

function playCard (cardValue, cardColor) {
  if (cardValue === toPlay.value || cardColor === toPlay.color || cardColor === 4 || toPlay.color === 4) {
    const card = { color: cardColor, value: cardValue }
    game.emit('cardPlayed', { 'gameCode': gameCode, 'card': card, 'player': userCode })
  }
}

function gameEvents () {
  console.log('game events', gameCode)
  game.on(gameCode, (data) => {
    data.players.forEach((item, index) => {
      if (item.cards.length === 0) {
        showAlert(`¡${item.nickname} ha ganado!`, 'La partida se reiniciara y todos los jugadores tendran 7 cartas otra vez')
      }
    })

    toPlay = data.topCard
    const topCard = document.getElementsByClassName('top-card')

    let color
    switch (toPlay.color) {
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

    let value
    value = toPlay.value
    switch (toPlay.value) {
      case 10:
        value = '+2'
        break
      case 11:
        value = '🚫'
        break
      case 14:
        value = '+4'
        break
    }

    for (let i = 0; i < topCard.length; i++) {
      topCard[i].innerHTML = `
      <button class="card ${color}">${value}</button>
      `
    }

    printCards(data)
  })

  game.on('getCard', (data) => {
    printCards(data)
  })
}

function showAlert (title, description) {
  document.getElementById('alert-wrapper').style.display = 'inherit'
  document.getElementById('alert-title').innerHTML = title
  document.getElementById('alert-description').innerHTML = description
}

function hideAlert () {
  document.getElementById('alert-wrapper').style.display = 'none'
}

// Event Listeners
document.getElementById('btn-multi-game').addEventListener('click', mainMenu)
document.getElementById('btn-create-game').addEventListener('click', createGame)
document.getElementById('btn-join-game').addEventListener('click', joinGame)
document.getElementById('btn-start-game').addEventListener('click', startGame)
document.getElementById('btn-fish-card').addEventListener('click', fishCard)
