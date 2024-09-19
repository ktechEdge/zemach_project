fetch('/plants.json')
    .then(response => response.json())
    .then(data => {
        populatePlantNameOptions(data);
        SubmitHandler(data);
        displayGraphdData(data);
    })
    .catch(error => console.error('Error fetching plant data:', error));
function plantName(id) {
    const [row, col] = id.split(',').map(Number);
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return letters[col] + (row + 1);
}

function populatePlantNameOptions(data) {
    const plantNameSelect = document.getElementById('plant-name');
    const uniqueNames = [...new Set(data.map(plant => plantName(plant.id)))];
    uniqueNames.forEach(name => {
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
        displayGraphdData(filteredData, sensorType);
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

function displayGraphdData(data, sensorType = '') {
    const timeline = Array.from({ length: 24 }, (_, hour) => {
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    const seriesData = {
        min: Array(12).fill(null),
        value: Array(12).fill(null),
        max: Array(12).fill(null)
    };


    data.forEach(plant => {
        const plantDate = new Date(plant.measurement_date)
        const hour = plantDate.getHours();

        const sensorValues = sensorType ? {
            min: plant[sensorType + '_min'],
            value: plant[sensorType],
            max: plant[sensorType + '_max']
        } : {
            uv_radiation: { min: plant.uv_radiation_min, value: plant.uv_radiation, max: plant.uv_radiation_max },
            light: { min: plant.light_min, value: plant.light, max: plant.light_max },
            air_temperature: { min: plant.air_temperature_min, value: plant.air_temperature, max: plant.air_temperature_max },
            air_humidity: { min: plant.air_humidity_min, value: plant.air_humidity, max: plant.air_humidity_max },
            soil_humidity: { min: plant.soil_humidity_min, value: plant.soil_humidity, max: plant.soil_humidity_max }
        }[sensorType];

        if (sensorValues) {
            seriesData.min[hour] = sensorValues.min;
            seriesData.value[hour] = sensorValues.value;
            seriesData.max[hour] = sensorValues.max;
        }
    });

    const options = {
        chart: { type: 'area' },
        stroke: { curve: 'smooth' },
        dataLabels: { enabled: true },
        series: [
            { name: sensorType + ' Min', data: seriesData.min },
            { name: sensorType + ' Value', data: seriesData.value },
            { name: sensorType + ' Max', data: seriesData.max }
        ],
        xaxis: {
            title: { text: sensorType + 'Value' },
            type: 'category',
            categories: timeline,
            labels: { rotate: -45 }
        },

        yaxis: { min : 0 }
    };

    const chartElement = document.querySelector("#chart");
    if (chartElement.innerHTML !== "") { chartElement.innerHTML = ""; }

    const chart = new ApexCharts(chartElement, options);
    chart.render();
}