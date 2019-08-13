const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
var echo = require('socket.io')(httpServer);

echo.origins('*:*');

echo.on('connection', connection => {
    connection.on('message', message => {
        console.log('a user connected!');
        console.log(`Data from client: ${message}`);
        echo.emit('message', message, { for: 'everyone' });
    });

    connection.on('disconnect', () => {
        console.log('connection closed!');
    });

});

httpServer.listen(process.env.PORT || 3001);