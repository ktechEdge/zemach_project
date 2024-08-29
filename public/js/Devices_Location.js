function fetchDeviceData() {
    return fetch('/device_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('Error fetching device data:', error);
        });
}

function groupPlantsByDevice(plants) {
    const deviceMap = {};
    plants.forEach(plant => {
        const deviceId = plant.device;
        const plantName = plant.plants;
        if (!deviceMap[deviceId]) {
            deviceMap[deviceId] = [];
        }
        deviceMap[deviceId].push(...plantName);
    });
    return deviceMap;
}

function generateDeviceTable(deviceMap) {
    const deviceDataContainer = document.getElementById('device-data');
    Object.keys(deviceMap).forEach(deviceId => {
        const deviceRow = document.createElement('tr');
        deviceRow.innerHTML = `
                <td>${deviceId}</td>
                <td>${deviceMap[deviceId].join(', ')}</td>
            `;
        deviceDataContainer.appendChild(deviceRow);
    });
}

fetchDeviceData()
    .then(plants => {
        const deviceMap = groupPlantsByDevice(plants);
        generateDeviceTable(deviceMap);
    })
    .catch(error => {
        console.error('Error fetching device data:', error);
    });
