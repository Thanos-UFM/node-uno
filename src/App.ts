import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIo from 'socket.io'
import * as path from 'path'

class App {
  public app: express.Application;
  public server: Server;
  public io: SocketIO.Server;
  
  private games: Array<any> = [];
  private cards: Array<{color: number, value: number}> = [];

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
        let newCard: any = {'color': c, 'value': v}
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
        this.games[index].players.push({'player': player, 'cards': this.dealCards()})
      }
    })
    console.log(this.games);
  }

  public dealCards(): Array<any>{
    let randomCardIndex: number;
    let randomCards: Array<any> = [];    
    for (let i = 0; i < 7; i++){
      randomCardIndex = Math.floor(Math.random()*this.cards.length)
      randomCards.push(this.cards[randomCardIndex])
      this.cards.splice(randomCardIndex, 1)
    }
    console.log(randomCards.toString())
    return randomCards
  }
}

// Exporta esta clase
export default new App()
