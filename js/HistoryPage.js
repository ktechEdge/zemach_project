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
        return fetch('./environmental-data-avg')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const plantID = getQueryParameter('id');
                const sensorType = '';
                if(plantID){
                    const datafilter = data.filter(plant => plant.id === plantID)
                    displayFilteredData(datafilter, sensorType);
                }
                else{
                    populatePlantNameOptions(data);
                    SubmitHandler(data);
                    displayFilteredData(data, sensorType);
                }
            })
    }

    async function convertIdToRowAndCol(item) {
        console.log(item);
        try {
            const response = await fetch(`/plants/${item.plant_ID}`);
            if (!response.ok) { throw new Error('Network response was not ok'); }
            return await response.json();
           }
        catch (error) { console.error('There was a problem with the fetch id operation:', error); }

    }
function getQueryParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function populatePlantNameOptions(data,plants) {
    const plantNameSelect = document.getElementById('plant-name');
    const uniqueNames = [...new Set(data.map(plant => plantName(plant.plant_ID, plants)))];
    uniqueNames.forEach(async name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        plantNameSelect.appendChild(option);
    });
}

function SubmitHandler(data) {
    document.getElementById('filter-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const plantNameValue = document.getElementById('plant-name').value;
        const sensorType = document.getElementById('sensor-type').value;
        const dateFrom = new Date(document.getElementById('date-from').value);
        const dateTo = new Date(document.getElementById('date-to').value);
        dateTo.setHours(23, 59, 59, 999);

        const filteredData = filterData(data, plantNameValue, sensorType, dateFrom, dateTo);
        displayFilteredData(filteredData, sensorType);
    });

}

function filterData(data, plantNameValue, sensorType, dateFrom, dateTo) {
    return data.filter(plant => {
        const plantDate = new Date(plant.measurement_date);
        const matchesPlantName = !plantNameValue || plantNameValue === plantName(plant.id);
        const matchesSensorType = !sensorType || !isNaN(plant[sensorType]);
        const matchesDate = (!dateFrom || !dateTo || (plantDate >= dateFrom && plantDate <= dateTo));

        return matchesPlantName && matchesSensorType && !matchesDate;
    });
}


function displayFilteredData(data,sensorType = '') {
    const filteredPlantDataContainer = document.getElementById('filtered-plant-data');
    filteredPlantDataContainer.innerHTML = '';

        data.forEach(async plant => {
        let DeviceID = await  convertIdToRowAndCol(plant);
        const plantRow = document.createElement('tr');
        plantRow.innerHTML = `
            <td>${plantName(plant.plant_ID)}</td>
            <td>${`${DeviceID[0].row}, ${DeviceID[0].col}`}</td>
            <td>${sensorType === 'uv_radiation' || !sensorType ? plant.uv_radiation : ''}</td>
            <td>${sensorType === 'uv_radiation' || !sensorType ? plant.uv_radiation_max : ''}</td>
            <td>${sensorType === 'uv_radiation' || !sensorType ? plant.uv_radiation_min : ''}</td>
            <td>${sensorType === 'light' || !sensorType ? plant.light : ''}</td>
            <td>${sensorType === 'light' || !sensorType ? plant.light_max : ''}</td>
            <td>${sensorType === 'light' || !sensorType ? plant.light_min : ''}</td>
            <td>${sensorType === 'air_temperature' || !sensorType ? plant.air_temperature : ''}</td>
            <td>${sensorType === 'air_temperature' || !sensorType ? plant.air_temperature_max : ''}</td>
            <td>${sensorType === 'air_temperature' || !sensorType ? plant.air_temperature_min : ''}</td>
            <td>${sensorType === 'air_humidity' || !sensorType ? plant.air_humidity : ''}</td>
            <td>${sensorType === 'air_humidity' || !sensorType ? plant.air_humidity_max : ''}</td>
            <td>${sensorType === 'air_humidity' || !sensorType ? plant.air_humidity_min : ''}</td>
            <td>${sensorType === 'soil_humidity' || !sensorType ? plant.soil_humidity : ''}</td>
            <td>${sensorType === 'soil_humidity' || !sensorType ? plant.soil_humidity_max : ''}</td>
            <td>${sensorType === 'soil_humidity' || !sensorType ? plant.soil_humidity_min : ''}</td>
            <td>${new Date(plant.measurement_date).toLocaleString()}</td>
        `;
        filteredPlantDataContainer.appendChild(plantRow);
    });
}
    fetchDeviceStatuses();