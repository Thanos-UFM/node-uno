import app from './App'

let port: number = 3000

// Levanta servidor node
app.server.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log(`Servidor está en puerto ${port}`);

  // Levanta socket
  app.io.on('connect', (socket: any) => {
    console.log(`Cliente conectado en puerto ${port}.`)

    socket.on('createGame', (data) =>{
      console.log(data.gameCode)
      app.createGame(data.gameCode)
    })

    socket.on('disconnect', () => {      
      console.log('Cliente desconectado');
    })
  })
})

process.on('SIGINT', function () {
  process.exit()
})
