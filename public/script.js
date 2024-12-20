const socket = io();
const deviceList = document.getElementById('device-list');

socket.on('deviceFound', (device) => {
  const item = document.createElement('li');
  item.textContent = `${device.name} (UUID: ${device.uuid})`;
  deviceList.appendChild(item);
});

socket.on('deviceData', (data) => {
  console.log('Data from device:', data);
});
