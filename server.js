const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const noble = require('noble'); // Bluetooth
const mqtt = require('mqtt'); // Optional: Used to simulate a device

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the web dashboard
app.use(express.static('public'));

const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Bluetooth scanning
noble.on('stateChange', (state) => {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', (peripheral) => {
  console.log(`Discovered Bluetooth device: ${peripheral.advertisement.localName} [${peripheral.uuid}]`);
  io.emit('deviceFound', {
    name: peripheral.advertisement.localName || 'Unknown Device',
    uuid: peripheral.uuid
  });
});

// Simulate devices (Optional)
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
mqttClient.on('connect', () => {
  mqttClient.subscribe('device/data');
});

mqttClient.on('message', (topic, message) => {
  console.log(`Received data: ${message.toString()}`);
  io.emit('deviceData', message.toString());
});


