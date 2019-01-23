var app = require('express')();
var services = require('./services')

const server = app.listen(8080, () => {
    console.log('server is listening on port: ', server.address().port)
})

var io = require('socket.io').listen(server)

var currentUsers = []

io.on('connection', function (socket) {
    socket.emit('currentUsers', currentUsers)

    socket.on('message', function (data) {
        const senderId = socket.id
        const receiverId = data.toId
        const message = data.message
        const sender = data.from
        const receiver = data.to;
        const time = new Date();
        const userTime = time.toString();
        console.log(receiver, sender)
        if (receiverId === 'general') {
            return io.emit('message', `${userTime} ${sender}:  ${message} ` + "\n", { from: `${sender}`, to: `${receiver}` })
        }
        io.to(`${senderId}`).to(`${receiverId}`).emit('message', `${userTime} ${sender}:  ${message} ` + "\n", { from: `${sender}`, to: `${receiver}` })
    })
    socket.on('chatNick', (data) => {
        currentUsers.push({ id: socket.id, chatNick: data })
        socket.broadcast.emit('newUser', socket.id, data)
    })

    socket.on('disconnect', function () {
        const chatNick = services.getUserNick(currentUsers, socket.id)
        if(chatNick){
            services.removeUser(currentUsers, socket.id)
            io.emit('userDisconnected', chatNick)
        }
       
        console.log('currentUSers', currentUsers)
    })
})


