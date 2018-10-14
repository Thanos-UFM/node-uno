import { createServer, Server } from 'http'
import * as card from './Card'
import * as express from 'express'
import * as socketIo from 'socket.io'
import * as cors from 'cors'
import * as path from 'path'

class App {
  public app: express.Application;
  public server: Server;
  public io: SocketIO.Server;
  
  private games: Array<any> = [];
  private cards: Array<any> = [];

  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')));
    // Http Server
    this.server = createServer(this.app)
    // Socket.io Server
    this.io = socketIo(this.server)

    //Llenar deck
    this.fillDeck()
  }

  fillDeck(){
    // LLenar el deck
    // Llenar cada color
    for (let c = 0; c < 4; c++){
      // Llenar cada tipo
      for (let v = 0; v < 14; v++){
        let newCard: card.Card = new card.Card
        newCard.color = c
        newCard.value = v

        this.cards.push(newCard)
      }
    }
  }

  public createGame(gameCode: string): void{
    this.games.push({'gameCode': gameCode, 'players': []})
    console.log(this.games)
  }

  public joinGame(gameCode: string, player: string): void{
    this.games.forEach((item, index) => {
      if (item.gameCode === gameCode){
        this.games[index].players.push(player)
      }
    })
    console.log(this.games);
  }
}

// Exporta esta clase
export default new App()
