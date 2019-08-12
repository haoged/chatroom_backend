const http = require('http');
const httpServer = http.createServer();
var echo = require('socket.io')(httpServer, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

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

httpServer.listen(process.env.PORT || 9999);

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.write('Hi, welcome to my first azure app!');
//     res.end();
// });

// server.listen(process.env.PORT || 3000);