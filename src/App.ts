import { createServer, Server } from 'http'
import * as card from './Card'
import * as express from 'express'
import * as socketIo from 'socket.io'
import * as path from 'path'

class App {
  public app: express.Application;
  public server: Server;
  public io: SocketIO.Server;
  public games: Array<any> = [];
  
  private cards: Array<any> = [];
  private turn: number;

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
        if (v > 11){
          newCard.color = 4
        }

        this.cards.push(newCard)
      }
    }
  }

  // Esta funcion crea un nuevo juego
  public createGame(gameCode: string): void{
    // Empuja un nuevo juego al arreglo de juegos
    this.games.push({'gameCode': gameCode, 'players': []})
    console.log(this.games)
  }

  public joinGame(gameCode: string, player: string): void{
    // Union de un nuevo jugador
    this.games.forEach((item, index) => {
      if (item.gameCode === gameCode){
        // Empujar un nuevo jugador al juego que quiere unirse
        this.games[index].players.push({'player': player, 'cards': this.dealCards()})
      }
    })
    console.log(this.games);
  }

  public dealCards(): Array<any>{
    // Retorna un arreglo de 7 cartas y las quita del maso
    let randomCardIndex: number;
    let randomCards: Array<any> = [];
    for (let i = 0; i < 7; i++){
      // Va a elegir un numero aleatorio de 0 a la cantidad de cartas que esten en el maso
      randomCardIndex = Math.floor(Math.random()*this.cards.length)
      // Empujo la carta con el indice del numero aleatorio
      randomCards.push(this.cards[randomCardIndex])
      // Quitar la carta sellecionada del maso
      this.cards.splice(randomCardIndex, 1)
    }
    // Retornar las 7 cartas seleccionadas de forma aleatoria
    return randomCards
  }

  public getTurn(){
    
  }
}

// Exporta esta clase
export default new App()
