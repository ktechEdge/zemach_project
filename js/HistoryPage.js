
function plantName(id) {
    const [row, col] = id.split(',').map(Number);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return letters[col] + (row + 1);
}

fetch('/plants.json')
    .then(response => response.json())
    .then(data => {
        const plantNameSelect = document.getElementById('plant-name');
        const uniqueNames = [...new Set(data.map(plant => plantName(plant.id)))];

        uniqueNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            plantNameSelect.appendChild(option);
        });

        document.getElementById('filter-form').addEventListener('submit', function (event) {
            event.preventDefault();

            const plantNameValue = document.getElementById('plant-name').value;
            const sensorType = document.getElementById('sensor-type').value;
            const dateFrom = new Date(document.getElementById('date-from').value);
            const dateTo = new Date(document.getElementById('date-to').value);
            dateTo.setHours(23, 59, 59, 999);

            const filteredData = data.filter(plant => {
            let matches = true;

            if (plantNameValue && plantNameValue !== plantName(plant.id)) matches = false;
            if (sensorType && !isNaN(plant[sensorType])) matches = true;
            else if (sensorType && isNaN(plant[sensorType])) matches = false;
            if (dateFrom && dateTo && (new Date(plant.measurement_date) < dateFrom || new Date(plant.measurement_date) > dateTo))  matches = false;
              return matches;
            });

            const filteredPlantDataContainer = document.getElementById('filtered-plant-data');
            filteredPlantDataContainer.innerHTML = '';

            filteredData.forEach(plant => {
                const plantRow = document.createElement('tr');
                plantRow.innerHTML = `
                    <td>${plant.id}</td>
                    <td>${plantName(plant.id)}</td>
                    <td>${plant.device_id}</td>
                    <td>${sensorType === 'uv_radiation' ? plant.uv_radiation : ''}</td>
                    <td>${sensorType === 'uv_radiation' ? plant.uv_radiation_max : ''}</td>
                    <td>${sensorType === 'uv_radiation' ? plant.uv_radiation_min : ''}</td>
                    <td>${sensorType === 'light' ? plant.light : ''}</td>
                    <td>${sensorType === 'light' ? plant.light_max : ''}</td>
                    <td>${sensorType === 'light' ? plant.light_min : ''}</td>
                    <td>${sensorType === 'air_temperature' ? plant.air_temperature : ''}</td>
                    <td>${sensorType === 'air_temperature' ? plant.air_temperature_max : ''}</td>
                    <td>${sensorType === 'air_temperature' ? plant.air_temperature_min : ''}</td>
                    <td>${sensorType === 'air_humidity' ? plant.air_humidity : ''}</td>
                    <td>${sensorType === 'air_humidity' ? plant.air_humidity_max : ''}</td>
                    <td>${sensorType === 'air_humidity' ? plant.air_humidity_min : ''}</td>
                    <td>${sensorType === 'soil_humidity' ? plant.soil_humidity : ''}</td>
                    <td>${sensorType === 'soil_humidity' ? plant.soil_humidity_max : ''}</td>
                    <td>${sensorType === 'soil_humidity' ? plant.soil_humidity_min : ''}</td>
                    <td>${new Date(plant.measurement_date).toLocaleString()}</td>
                `;
                filteredPlantDataContainer.appendChild(plantRow);
            });
        });
    })
    .catch(error => console.error('Error fetching plant data:', error));
