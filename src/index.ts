import game from './App'

let port: number = 3000

// Levanta servidor node
game.server.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`);

  // Levanta socket
  game.io.on('connect', (socket: SocketIO.Socket) => {
    let handshake = socket.handshake;
    console.log(`Nuevo cliente, ${handshake.address}`);
    //console.log(`Cliente conectado en puerto ${port}.`)

    // Recibe el evento createGame
    socket.on('createGame', (data) => {
      game.createGame(data.gameCode)
    })

    // Recibe el evento joinGame
    socket.on('joinGame', (data) => {
      game.joinGame(data.gameCode, data.player)
      game.io.emit('playerJoined', data);
    })

    // Recibe el evento startGame
    socket.on('startGame', (data) => {
      game.games.forEach( (item, index) => {
        if (item.gameCode == data.gameCode){
          game.games[index].players.forEach( (item, index) => {
            console.log('JUEGO INCIADO!')
            game.io.emit(item.player, item.cards);
          })
        }
      })
    })

    socket.on('disconnect', (data) => {
      console.log(`Cliente desconectado, ${handshake.address}`);
    })
  })
})

process.on('SIGINT', function () {
  process.exit()
})
