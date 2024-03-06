// Establish connection to the server using Socket.IO
const socket = io();

// Listen for 'update' events from the server
socket.on('update', (data) => {
    console.log('socket.on update Enter');
    // Debugging: Log the received data to the console
    console.log('Received data:');
    console.log(data); // Adjusted to log the entire data object

    // Reference to the HTML element where updates will be displayed
    const instrumentsDiv = document.getElementById('instruments');

    // Clear any previous content
    instrumentsDiv.innerHTML = '';

    // Create a new div element to display the received data
    const div = document.createElement('div');
    div.className = 'instrument'; // Assign a class for potential styling

    // Construct the inner HTML of the div with the received data
    // Check if data.instName, data.userName, and data.ipAddr exist before using them
    div.innerHTML = `Instrument Name: ${data.instName || 'N/A'}, User Name: ${data.userName || 'N/A'}, IP Address: ${data.ipAddr || 'N/A'}`;

    // Append the new div to the instruments div
    instrumentsDiv.appendChild(div);

    console.log('socket.on update Leave');
});

// Additional client-side logic can be added here as needed
