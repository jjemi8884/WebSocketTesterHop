const express = require('express');
const http = require('http');
const websocket = require('ws');

const app = express();
const server = new websocket.Server({port:3000});

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/resources/index.html"); // Serve the HTML file
});

server.on('connection', (ws) => {
    console.log('New user connected');

    ws.send('This is a test');

    ws.onmessage = (event) => {
        console.log("Received: ", event.data);
        ws.send('received message');

    };

    // ws.on('createMessage', (message) => { 
    //     console.log('New message:', message);
    //     ws.send('received message' + message); // Send to everyone
    // });

    ws.onclose= () => {
        console.log('User disconnected');
    };
});



server.addListener(port, () => {
    console.log(`Server is up on port ${port}`);
});