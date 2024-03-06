// Establish connection to the server using Socket.IO
const socket = io();

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
socket.on('connect', () => {
    console.log('Connected to the server');
});

// Listen for 'update' events from the server
socket.on('update', (data) => {
    console.log('socket.on update Enter');
    console.log('Received data:', data);

    // Assuming data structure is { instName, userName, ipAddr }
    // Use default values if any field is missing
    const instName = data.instName || 'Unknown';
    const userName = data.userName || 'Unknown';
    const ipAddr = data.ipAddr || 'Unknown';

    // Reference to the HTML element where updates will be displayed
    const instrumentsDiv = document.getElementById('instruments');

    // Clear any previous content
    instrumentsDiv.innerHTML = '';

    // Create a new div element to display the received data
    const div = document.createElement('div');
    div.className = 'instrument';
    div.innerHTML = `Instrument Name: ${instName}, User Name: ${userName}, IP Address: ${ipAddr}`;

    // Append the new div to the instruments div
    instrumentsDiv.appendChild(div);

    console.log('socket.on update Leave');
});
