
const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        /*origin: "http://10.60.48.187:3001",*/
        methods: ["GET", "POST"]
    },
    serveClient: false
});

/*app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});*/

io.on('connection', (socket) => {

    /*socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });*/
    console.log('server connected')
    const msg = "SERVER MESSAGE"
    io.emit('server emit', msg);

    // this will emit the event to all connected sockets
    socket.on('client socket emit', (clientMsg) => {
        console.log("client msg:", clientMsg);
    })

});

server.listen(3001, () => {
    console.log("Server 1 is running on port 3001!");
})
