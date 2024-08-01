function plantName(id) {
    const [row, col] = id.split(',').map(Number);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return letters[col] + (row + 1);
}

fetch('/plants.json')
    .then(response => response.json())
    .then(data => {
        const plantDataContainer = document.getElementById('plant-data');
        data.forEach(plant => {
            const plantRow = document.createElement('tr');
            plantRow.innerHTML = `
                    <td>${plant.id}</td>
                    <td>${plantName(plant.id)}</td>
                    <td>${plant.device_id}</td>
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