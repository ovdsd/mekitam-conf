const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const axios = require('axios');
const { ExpressPeerServer } = require('peer');
const PORT = process.env.PORT || 8000;

const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

axios.get('http:/localhost:8080/meeting/index')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });


app.use('/', require('./routes/index'));

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId, userName) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-connected', userId, userName);
        socket.on('send-message', (inputMsg, userName) => {
            io.to(roomId).emit('recieve-message', inputMsg, userName);
        });
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user-disconnected', userId, userName);
        });
    });
});

server.listen(PORT, (err) => {
    if (err) {
        console.log(`Error :: ${err} occurred while starting the server in index.js!`);
    }
    console.log(`Server is up and running on port ${PORT}`);
});
