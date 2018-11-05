"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const Card_1 = require("./components/Card");
const express = require("express");
const socketIo = require("socket.io");
const path = require("path");
class App {
    constructor() {
        this.games = [];
        this.cards = [];
        // App Express
        this.app = express();
        // Carga los archivos estaticos del directorio 'client'
        this.app.use(express.static(path.resolve(__dirname, '../client')));
        // Http Server
        this.server = http_1.createServer(this.app);
        // Socket.io Server
        this.io = socketIo(this.server);
        //Llenar deck
        this.fillDeck();
    }
    fillDeck() {
        // LLenar el deck
        // Llenar cada color
        for (let c = 0; c < 4; c++) {
            // Llenar cada tipo
            for (let v = 0; v < 14; v++) {
                let newCard = new Card_1.Card;
                newCard.color = c;
                newCard.value = v;
                if (v > 11) {
                    newCard.color = 4;
                }
                this.cards.push(newCard);
            }
        }
        return this.cards;
    }
    // Esta funcion crea un nuevo juego
    createGame(gameCode) {
        // Empuja un nuevo juego al arreglo de juegos
        this.games.push({ 'gameCode': gameCode, 'players': [], 'topCard': this.dealCards(1)[0] });
        console.log(this.games);
        return this.games;
    }
    joinGame(gameCode, player, ip) {
        // Union de un nuevo jugador
        let result = false;
        this.games.forEach((item, index) => {
            // Verificar que la misma IP no esta repetida
            let rep = false;
            if (item.gameCode === gameCode) {
                // Si la ip ya esta en el juego solo cambiar su nickname
                this.games[index].players.forEach((item, index) => {
                    if (item.id == ip) {
                        rep = true;
                        item.nickname = player;
                    }
                });
                let cards;
                if (rep == false) {
                    cards = this.dealCards();
                    // Empujar un nuevo jugador al juego que quiere unirse          
                    this.games[index].players.push({ 'id': ip, 'nickname': player, 'cards': cards });
                }
                this.io.emit(player, cards);
                console.log(this.games[index]);
                result = this.games[index];
            }
        });
        return result;
    }
    dealCards(cardsToDeal = 7) {
        // Retorna un arreglo de 7 cartas y las quita del maso
        let randomCardIndex;
        let randomCards = [];
        for (let i = 0; i < cardsToDeal; i++) {
            // Va a elegir un numero aleatorio de 0 a la cantidad de cartas que esten en el maso
            randomCardIndex = Math.floor(Math.random() * this.cards.length);
            // Empujo la carta con el indice del numero aleatorio
            randomCards.push(this.cards[randomCardIndex]);
            // Quitar la carta sellecionada del maso
            this.cards.splice(randomCardIndex, 1);
        }
        // Retornar las 7 cartas seleccionadas de forma aleatoria
        return randomCards;
    }
    playCard() {
    }
}
// Exporta esta clase
exports.default = new App();
//# sourceMappingURL=App.js.map