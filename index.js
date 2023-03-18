const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


//res.setHeader('Content-Type', 'application/json')

let order = [];
let currentOrder = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
    console.log("socket is present")
  });

  socket.on('message', (message) => {
    switch (message) {
      case '1':
        socket.emit('message', 'Select an item:');
        socket.emit('message', '1. Sea Okro with Eba');
        socket.emit('message', '2. Efo riro with poundedyam');
        socket.emit('message', '3. Ekuru and sauce');
        break;

      case '2':
        order.push('Sea Okro with Eba');
        socket.emit('message', 'Added Sea Okro with Eba to your order');
        break;

      case '3':
        order.push('Sea Okro with Eba');
        socket.emit('message', 'Added Sea Okro with Eba to your order');
        break;

      case '4':
        order.push('Sea Okro with Eba');
        socket.emit('message', 'Added Sea Okro with Eba to your order');
        break;

      case '99':
        if (order.length === 0) {
          socket.emit('message', 'No order to place');
        } else {
          socket.emit('message', 'Order placed');
          currentOrder = order;
          order = [];
        }
        break;

      case '98':
        if (currentOrder.length === 0) {
          socket.emit('message', 'No order history');
        } else {
          socket.emit('message', `Order history: ${currentOrder.join(', ')}`);
        }
        break;

      case '97':
        if (order.length === 0) {
          socket.emit('message', 'No current order');
        } else {
          socket.emit('message', `Current order: ${order.join(', ')}`);
        }
        break;

      case '0':
        if (order.length === 0) {
          socket.emit('message', 'No order to cancel');
        } else {
          order = [];
          socket.emit('message', 'Order cancelled');
        }
        break;

      default:
        socket.emit('message', "I'm sorry, I didn't understand that");
        break;
    }
  });
});



const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});