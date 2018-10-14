import game from './App'

let port: number = 3000

// Levanta servidor node
game.server.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`);

  // Levanta socket
  game.io.on('connect', (socket: any) => {
    console.log(`Cliente conectado en puerto ${port}.`)

    // Recive el evento createGame
    socket.on('createGame', (data) => {
      game.createGame(data.gameCode)
    })

    // Recive el evento joinGame
    socket.on('joinGame', (data) => {
      game.joinGame(data.gameCode, data.player)
    })

    socket.on('startGame', (data) => {
      
    })

    socket.on('disconnect', () => {      
      console.log('Cliente desconectado');
    })
  })
})

process.on('SIGINT', function () {
  process.exit()
})
