const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')


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

    socket.emit('message', generateMessage(welcomeMsg))
    socket.broadcast.emit('message', generateMessage('A new user has joined.'))

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter()

        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }
        io.emit('message', generateMessage(msg))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(coords.latitude, coords.longitude))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left'))
    })

})

server.listen(port, () => {
    console.log('Server is up on port ', port)
})
