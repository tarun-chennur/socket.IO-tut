const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');

const { Server } = require('socket.io');


const app = express();//instance of express
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {// must match the name given in the index.html file
//       console.log('message: ' + msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//       });
//   });
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
// Connect to rooms
// io.on('connection', (socket) => {
//   // join the room named 'some room'
//   socket.join('some room');
  
//   // broadcast to all connected clients in the room
//   io.to('some room').emit('hello', 'world');

//   // broadcast to all connected clients except those in the room
//   io.except('some room').emit('hello', 'world');

//   // leave the room
//   socket.leave('some room');
// });
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});