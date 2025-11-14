const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);
  
  socket.on('mouse', (data) => {
    socket.broadcast.emit('mouse', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});