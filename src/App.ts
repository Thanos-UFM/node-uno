import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIo from 'socket.io'

class App {
  public app: express.Application;
  public server: Server;
  public io: SocketIO.Server;

  constructor () {
    // App Express
    this.app = express()
    // Http Server
    this.server = createServer(this.app)
    // Socket.io Server
    this.io = socketIo(this.server)
  }
}

// Exporta esta clase
export default new App()
