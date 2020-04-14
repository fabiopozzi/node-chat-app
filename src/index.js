const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
// Define path for Express configuration
const publicDirPath = path.join(__dirname, '../public')

// setup static directory to use
app.use(express.static(publicDirPath))

const welcomeMsg = 'Welcome! Benvenuto coglione!'

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', welcomeMsg);

    socket.on('sendMessage', (msg) => {
        io.emit('message', msg)
    })
})

server.listen(port, () => {
    console.log('Server is up on port ', port)
})
