const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose')
const socketIO = require('socket.io');
const dbURL = 'mongodb://localhost/djigolab'
//const dbURL = 'mongodb://lord:djigolab12@ds245661.mlab.com:45661/djigoio'
const PORT = process.env.PORT || 5000;

mongoose.connect(dbURL, {
        useNewUrlParser: true
    })
    .then(db => console.log('Connected!'))
    .catch(err => console.error(err))

const server = express()
    .use(morgan('dev'))
    .use(express.json())
    .use("/api/articles", require(__dirname + '/routes/articles'))
    .use(express.static(__dirname + '/public'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', function (socket) {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    socket.on('NEW_ENTRY', function () {
        io.emit('ENTRY_ADDED')
    })
});