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

    socket.on('createGame', (data) =>{
      game.createGame(data.gameCode)
    })

    socket.on('disconnect', () => {      
      console.log('Cliente desconectado');
    })
  })
})

process.on('SIGINT', function () {
  process.exit()
})
