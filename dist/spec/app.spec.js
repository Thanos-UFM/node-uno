"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("../App");
const chai_1 = require("chai");
require("mocha");
describe('Llenar deck', () => {
    it('Deberia retornar deck completo de cartas de uno', () => {
        const result = App_1.default.fillDeck();
        chai_1.expect(JSON.stringify(result)).to.equal('[{"color":0,"value":0},{"color":0,"value":1},{"color":0,"value":2},{"color":0,"value":3},{"color":0,"value":4},{"color":0,"value":5},{"color":0,"value":6},{"color":0,"value":7},{"color":0,"value":8},{"color":0,"value":9},{"color":0,"value":10},{"color":0,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":1,"value":0},{"color":1,"value":1},{"color":1,"value":2},{"color":1,"value":3},{"color":1,"value":4},{"color":1,"value":5},{"color":1,"value":6},{"color":1,"value":7},{"color":1,"value":8},{"color":1,"value":9},{"color":1,"value":10},{"color":1,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":2,"value":0},{"color":2,"value":1},{"color":2,"value":2},{"color":2,"value":3},{"color":2,"value":4},{"color":2,"value":5},{"color":2,"value":6},{"color":2,"value":7},{"color":2,"value":8},{"color":2,"value":9},{"color":2,"value":10},{"color":2,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":3,"value":0},{"color":3,"value":1},{"color":3,"value":2},{"color":3,"value":3},{"color":3,"value":4},{"color":3,"value":5},{"color":3,"value":6},{"color":3,"value":7},{"color":3,"value":8},{"color":3,"value":9},{"color":3,"value":10},{"color":3,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":0,"value":0},{"color":0,"value":1},{"color":0,"value":2},{"color":0,"value":3},{"color":0,"value":4},{"color":0,"value":5},{"color":0,"value":6},{"color":0,"value":7},{"color":0,"value":8},{"color":0,"value":9},{"color":0,"value":10},{"color":0,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":1,"value":0},{"color":1,"value":1},{"color":1,"value":2},{"color":1,"value":3},{"color":1,"value":4},{"color":1,"value":5},{"color":1,"value":6},{"color":1,"value":7},{"color":1,"value":8},{"color":1,"value":9},{"color":1,"value":10},{"color":1,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":2,"value":0},{"color":2,"value":1},{"color":2,"value":2},{"color":2,"value":3},{"color":2,"value":4},{"color":2,"value":5},{"color":2,"value":6},{"color":2,"value":7},{"color":2,"value":8},{"color":2,"value":9},{"color":2,"value":10},{"color":2,"value":11},{"color":4,"value":12},{"color":4,"value":13},{"color":3,"value":0},{"color":3,"value":1},{"color":3,"value":2},{"color":3,"value":3},{"color":3,"value":4},{"color":3,"value":5},{"color":3,"value":6},{"color":3,"value":7},{"color":3,"value":8},{"color":3,"value":9},{"color":3,"value":10},{"color":3,"value":11},{"color":4,"value":12},{"color":4,"value":13}]');
    });
});
describe('Repartir cartas', () => {
    it('Deberia retornar un arreglo de 7 cartas', () => {
        const result = App_1.default.dealCards();
        chai_1.expect(result).to.be.an('array').of.length(7);
    });
    it('Deberia quitar esas 7 cartas del deck', () => {
        const result = App_1.default.dealCards();
        let rep = 0;
        for (let i = 0; i < App_1.default.cards.length; i++) {
            for (let n = 0; n < 7; n++) {
                if (App_1.default.cards[i] == result[n]) {
                    rep += 1;
                }
            }
        }
        chai_1.expect(rep).to.equal(0);
    });
});
describe('Crear partida y unir jugador', () => {
    it('Deberia crear una nueva partida con el codigo "1"', () => {
        const result = App_1.default.createGame('1');
        chai_1.expect(result).to.be.an('array').of.length(1);
        chai_1.expect(result[0].gameCode).to.equal('1');
    });
    it('Deberia de no responder false la union', () => {
        const result = App_1.default.joinGame('1', 'a', '::1');
        chai_1.expect(result).to.not.be.an('boolean');
    });
});
//# sourceMappingURL=app.spec.js.map