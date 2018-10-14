import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIo from 'socket.io'
import * as cors from 'cors'
import * as path from 'path'

class App {
  public app: express.Application;
  public server: Server;
  public io: SocketIO.Server;

  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')));
    // Http Server
    this.server = createServer(this.app)
    // Socket.io Server
    this.io = socketIo(this.server)
  }
}

// Exporta esta clase
export default new App()
