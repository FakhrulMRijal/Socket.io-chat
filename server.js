const express = require('express');
const app = express();
const path = require('path')
const port = 3003;
// const http = require('http').createServer();
const server = app.listen(port, () => {
    console.log(`Server on Port : ${port}`)
})


const io = require('socket.io')(server);

// io.on('connection', (socket) => {
//     socket.emit('welcome', 'Hello There and Welcome Socket.io server')

//     console.log(`New Client is connected`);
// })

app.use(express.static(path.join(__dirname, 'public')))

// io.on('connection', (socket) => {
//     console.log('Masuk', socket.id)
// })

let socketsConected = new Set()

const onConnected = (socket) => {
    console.log('Socket already use', socket.id)
    socketsConected.add(socket.id)
    io.emit('total-user', socketsConected.size)

    socket.on('disconnect', () => {
        console.log('Socket out', socket.id)
        socketsConected.delete(socket.id)
        io.emit('total-user', socketsConected.size)
      })
    
    socket.on('message', (data) => {
    console.log('Message', data)
    socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
    })

}


io.on('connection', onConnected)


// io.on('connection',)


// io

//     .of('/games')
//     .on('connection', (socket) => {
//         console.log("HI! New User")
//         socket.emit('Welcome', 'Welcome in game')

//         socket.on('joinRoom', (room) => {
//             if(gameRooms.includes(room)){
//                 socket.join(room);
//                 io
//                     .of('/games')
//                     .in(room)
//                     .emit('newUser', `New user has join in this room${room}`)
//             } else {
//                 return socket.emit('Err', `Error, No rooom ${room}`)
//             }
//         })
//     })

