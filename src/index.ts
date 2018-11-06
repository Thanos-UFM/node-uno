import game from './App'

const port: any = process.env.PORT || 3000

// Levanta servidor node
game.server.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`);

  // Levanta socket
  game.io.on('connect', (socket: SocketIO.Socket) => {
    let handshake = socket.handshake;
    console.log(`Nuevo cliente, ${handshake.address}`);

    // Recibe el evento createGame
    socket.on('createGame', (data) => {
      game.createGame(data.gameCode)
    })

    // Recibe el evento joinGame
    socket.on('joinGame', (data) => {      
      game.io.emit('playerJoined', game.joinGame(data.gameCode, data.player, handshake.address))
    })

    // Recibe el evento startGame
    socket.on('startGame', (data) => {
      console.log("-------GAME STARTED------")
      game.io.emit(data.gameCode, game.playCard(data.gameCode, game.dealCards(1)[0]))      
    })
    
    socket.on('cardPlayed', (data) => {

    })

    socket.on('disconnect', (data) => {
      console.log(`Cliente desconectado, ${handshake.address}`);
    })
  })
})

process.on('SIGINT', function () {
  process.exit()
})
