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

const welcomeMsg = 'Welcome! Benvenuto!'

io.on('connection', (socket) => {
    console.log('New websocket connection');

    socket.emit('message', welcomeMsg);
    socket.broadcast.emit('message', 'A new user has joined.')

    socket.on('sendMessage', (msg, callback) => {
        io.emit('message', msg)
        callback('Delivered')
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left')
    })

})

server.listen(port, () => {
    console.log('Server is up on port ', port)
})
