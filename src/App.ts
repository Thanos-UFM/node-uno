import { createServer, Server } from 'http'
import { Game } from './components/Game'
import { Card } from './components/Card'
import * as express from 'express'
import * as socketIo from 'socket.io'
import * as path from 'path'

class App {
  // Variables publicas
  public app: express.Application
  public server: Server
  public io: SocketIO.Server
  public games: Array<Game> = []
  public cards: Array<Card> = []

  public usedCards: Array<Card> = []

  // Variables privadas  
  private turn: number

  constructor () {
    // App Express
    this.app = express()
    // Carga los archivos estaticos del directorio 'client'
    this.app.use(express.static(path.resolve(__dirname, '../client')))
    // Http Server
    this.server = createServer(this.app)
    // Socket.io Server
    this.io = socketIo(this.server)

    //Llenar deck
    this.fillDeck()
  }

  fillDeck(): Array<any>{
    // LLenar el deck
    // Llenar cada color
    for (let c = 0; c < 4; c++){
      // Llenar cada tipo
      for (let v = 0; v < 14; v++){
        let newCard: Card = new Card        
        newCard.color = c
        newCard.value = v
        if (v > 11){
          newCard.color = 4
        }

        this.cards.push(newCard)
      }
    }
    return this.cards
  }

  // Esta funcion crea un nuevo juego
  public createGame(gameCode: string): Array<Game>{
    // Empuja un nuevo juego al arreglo de juegos
    this.games.push({'gameCode': gameCode, 'players': [], 'topCard': this.dealCards(1)[0], 'turn': -1})
    console.log(this.games)
    return this.games
  }

  public joinGame(gameCode: string, player: string, ip: string): Game | boolean{
    // Union de un nuevo jugador
    let result: any = false
    this.games.forEach((item, index) => {
      // Verificar que la misma IP no esta repetida
      let rep: boolean = false
      if (item.gameCode === gameCode){
        // Si la ip ya esta en el juego solo cambiar su nickname
        this.games[index].players.forEach((item, index) => {
          if (item.id == ip){
            rep = true
            item.nickname = player            
          }
        })

        let cards: Array<Card>
        if (rep == false){
          cards = this.dealCards();
          // Empujar un nuevo jugador al juego que quiere unirse          
          this.games[index].players.push({'id': ip, 'nickname': player, 'cards': cards})
        }
        this.io.emit(player, cards);
        console.log(this.games[index])
        result = this.games[index]
      }
    })
    return result
  }

  public dealCards(cardsToDeal: number = 7): Array<Card>{
    // Retorna un arreglo de 7 cartas y las quita del maso
    let randomCardIndex: number
    let randomCards: Array<any> = []
    for (let i = 0; i < cardsToDeal; i++){
      if (this.cards.length == 0){
        this.cards == this.usedCards;
      }
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

  public playCard(gameCode: string, playedCard: Card, nickname: any = false): Game{
    let result: Game;
    this.games.forEach((game, index) => {
      if (game.gameCode == gameCode){
        game.topCard = playedCard
        game.turn = (game.turn + 1) % game.players.length
        
        this.usedCards.push(playedCard)
        if (nickname){
          game.players.forEach((player, ind) => {
            if (player.nickname == nickname){
              for (let i = 0; i < player.cards.length; i++){
                if (player.cards[i].color == playedCard.color && player.cards[i].value == playedCard.value){
                  player.cards.splice(i, 1)
                  i = player.cards.length
                }
              }
            }            
          })
        }

        result = game
      }
    })
    return result
  }
}

// Exporta esta clase
export default new App()
