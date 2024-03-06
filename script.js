const socket = io();

socket.on('update', (data) => {
    console.log('Received data:', data);

    // Reference to the container where instrument data will be displayed
    const instrumentsDiv = document.getElementById('instruments');

    // Generate a unique ID or key for each instrument based on its name
    const instrumentId = `instrument-${data.instName.replace(/\W+/g, '-').toLowerCase()}`;
    let instrumentDiv = document.getElementById(instrumentId);

    // Check if this instrument's div already exists
    if (instrumentDiv) {
        // If it exists, update its content
        instrumentDiv.innerHTML = `Instrument Name: ${data.instName}, User Name: ${data.userName}, IP Address: ${data.ipAddr}`;
    } else {
        // If it doesn't exist, create a new div for this instrument
        instrumentDiv = document.createElement('div');
        instrumentDiv.id = instrumentId; // Set the ID for future reference
        instrumentDiv.className = 'instrument';
        instrumentDiv.innerHTML = `Instrument Name: ${data.instName}, User Name: ${data.userName}, IP Address: ${data.ipAddr}`;

        // Append the new div to the instruments container
        instrumentsDiv.appendChild(instrumentDiv);
    }

    console.log('socket.on LEAVE');
});
