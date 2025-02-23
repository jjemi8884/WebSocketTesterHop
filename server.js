const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Initialize socket.io
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/resources/index.html"); // Serve the HTML file
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', { from: 'Server', text: 'Welcome!', createdAt: Date.now() });

    socket.on('createMessage', (message) => { 
        console.log('New message:', message);
        startTimmer(message);
        io.emit('newMessage', message); // Send to everyone
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

function startTimmer(message){
    
    let i = 10;
    if(message.text === "start"){
        console.log("Starting the timer prepare for count down");
        let i = 1
        setInterval(() => {
            message.text = i.toString();
            io.emit('newMessage', message);
            i++;
    },1000,message,i);
    
}}

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});