const socket = io();

socket.on('update', (data) => {
    console.log('socket.on update Enter');
    console.log('Received data:');
    console.log(data.message); // Check if this message appears in the browser console
    const instrumentsDiv = document.getElementById('instruments');
    instrumentsDiv.innerHTML = ''; // Clear current content

    const div = document.createElement('div');
    div.className = 'instrument';
    div.innerHTML = `Instrument Name: ${data.instName}, User Name: ${data.userName}, IP Address: ${data.ipAddr}`;
    instrumentsDiv.appendChild(div);

    console.log('socket.on update Leave');
});

