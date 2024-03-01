const socket = io();

socket.on('update', (instruments) => {
    const instrumentsDiv = document.getElementById('instruments');
    instrumentsDiv.innerHTML = ''; // Clear current instruments

    Object.keys(instruments).forEach((instrumentName) => {
        const userData = instruments[instrumentName];
        const div = document.createElement('div');
        div.className = 'instrument';
        div.innerHTML = `<strong>${instrumentName}</strong>: ${JSON.stringify(userData)}`;
        instrumentsDiv.appendChild(div);
    });
});
