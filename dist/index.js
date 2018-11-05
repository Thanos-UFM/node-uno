"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
let port = 80;
// Levanta servidor node
App_1.default.server.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Servidor está en puerto ${port}`);
    // Levanta socket
    App_1.default.io.on('connect', (socket) => {
        let handshake = socket.handshake;
        console.log(`Nuevo cliente, ${handshake.address}`);
        //console.log(`Cliente conectado en puerto ${port}.`)
        // Recibe el evento createGame
        socket.on('createGame', (data) => {
            App_1.default.createGame(data.gameCode);
        });
        // Recibe el evento joinGame
        socket.on('joinGame', (data) => {
            App_1.default.io.emit('playerJoined', App_1.default.joinGame(data.gameCode, data.player, handshake.address));
        });
        // Recibe el evento startGame
        socket.on('startGame', (data) => {
            console.log("-------GAME STARTED------");
            console.log(data);
        });
        socket.on('cardPlayed', (data) => {
        });
        socket.on('disconnect', (data) => {
            console.log(`Cliente desconectado, ${handshake.address}`);
        });
    });
});
process.on('SIGINT', function () {
    process.exit();
});
//# sourceMappingURL=index.js.map