const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.Server(app);
var echo = require('socket.io')(httpServer);

echo.origins('*:*');
// echo.origins((origin, callback) => {
//     if (origin !== 'http://localhost:3000') {
//       return callback('origin not allowed', false);
//     }
//     callback(null, true);
//   });

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

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.write('Hi, welcome to my first azure app!');
//     res.end();
// });

// server.listen(process.env.PORT || 3000);