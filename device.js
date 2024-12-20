const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com');

client.on('connect', () => {
  console.log('Simulated device connected');

  setInterval(() => {
    const data = {
      deviceId: 'device_001',
      temperature: (Math.random() * 100).toFixed(2),
      humidity: (Math.random() * 100).toFixed(2),
      timestamp: new Date().toISOString()
    };

    client.publish('device/data', JSON.stringify(data));
    console.log('Sent:', data);
  }, 5000);
});


