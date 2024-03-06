const socket = io();

// Handle initial data load
socket.on('initialData', (data) => {
    Object.values(data).forEach(instrumentData => {
        updateInstrument(instrumentData);
    });
});

// Handle updates for instruments
socket.on('update', (data) => {
    updateInstrument(data);
});

function updateInstrument(data) {
    const instrumentsDiv = document.getElementById('instruments');
    const instrumentId = `instrument-${data.instName.replace(/\W+/g, '-').toLowerCase()}`;
    let instrumentDiv = document.getElementById(instrumentId);

    if (!instrumentDiv) {
        instrumentDiv = document.createElement('div');
        instrumentDiv.id = instrumentId;
        instrumentDiv.className = 'instrument';
        instrumentsDiv.appendChild(instrumentDiv);
    }

    instrumentDiv.innerHTML = `Instrument Name: ${data.instName}, User Name: ${data.userName}, IP Address: ${data.ipAddr}, Last Updated: ${data.lastUpdateTime}`;
}

