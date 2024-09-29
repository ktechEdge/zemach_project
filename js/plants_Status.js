function plantName(id) {
    const row = id , col = id;
    let letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    document.querySelectorAll('.grid-item').forEach((item) => {
        [row, col] = item.id.split(',').map(Number);
        const className = letters[col] + (row + 1);
        item.classList.add(className);
        item.textContent = className;
    });
    return letters[col] + (row + 1);
}
function fetchDeviceStatuses() {
    return fetch('/environmental-data-avg')
        .then(response => response.json())
        .then(data => data);
}

async function convertIdToRowAndCol(item) {
    console.log(item);
    try {
        let response = await fetch(`/plants/${item.plant_ID}`);
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return await response.json();
    }
    catch (error) { console.error('There was a problem with the fetch id operation:', error); }
}
function displayStatus() {
    fetchDeviceStatuses()
        .then(data => {
            const plantDataContainer = document.getElementById('plant-data');
            data.forEach(async plant => {
                let DeviceID = await  convertIdToRowAndCol(plant);
                let plantRow = document.createElement('tr');
                plantRow.innerHTML = `
                    <td>${plant.id}</td>
                    <td>${plantName(plant.plant_ID)}</td>
                    <td>${`${DeviceID[0].row}, ${DeviceID[0].col}`}</td>
                    <td>${plant.uv_radiation}</td>
                    <td>${plant.light}</td>
                    <td>${plant.air_temperature}</td>
                    <td>${plant.air_humidity}</td>
                    <td>${plant.soil_humidity}</td>
                    <td>${new Date(plant.measurement_date).toLocaleString()}</td>
                    <td>${plant.uv_radiation_max || ''}</td>
                    <td>${plant.uv_radiation_min || ''}</td>
                    <td>${plant.light_max || ''}</td>
                    <td>${plant.light_min || ''}</td>
                    <td>${plant.air_temperature_max || ''}</td>
                    <td>${plant.air_temperature_min || ''}</td>
                    <td>${plant.air_humidity_max || ''}</td>
                    <td>${plant.air_humidity_min || ''}</td>
                    <td>${plant.soil_humidity_max || ''}</td>
                    <td>${plant.soil_humidity_min || ''}</td>
                    <td>${plant.connected ? 'Connected' : 'Disconnected'}</td>
                `;
                plantDataContainer.appendChild(plantRow);
            });
        })
        .catch(error => console.error('Error fetching plant data:', error));
}
displayStatus();