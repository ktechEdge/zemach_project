const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

document.querySelectorAll('.grid-item').forEach((item) => {
    const [row, col] = item.id.split(',').map(Number);
    const className = letters[col] + (row + 1);
    item.classList.add(className);
    item.textContent = className;
});

function fetchDeviceStatuses() {
    return fetch('/environmental-data-avg')
        .then(response => response.json())
        .then(data => data);
}

function updateGridColors() {
    fetchDeviceStatuses()
        .then(plants => {   
            const currentTime = new Date();  // Get current time
            plants.forEach(plant => {
                const gridItem = document.getElementById(plant.id);
                if (gridItem) {
                    // Calculate the time difference
                    const measurementTime = new Date(plant.measurement_date);
                    const timeDifference = currentTime - measurementTime;  // Difference in milliseconds

                    // Add click listener to the grid item
                    gridItem.addEventListener("click", () => {
                        const plantID = gridItem.id;
                        window.location.href = `/plant_Status_history?id=${plantID}`;
                    });

                    // Remove previous color classes
                    gridItem.classList.remove('connected', 'disconnected');

                    // If the time difference is more than 2 minutes (120000 ms), mark as disconnected (red)
                    if (timeDifference > 120000) {
                        gridItem.classList.add('disconnected');
                    } else {
                        gridItem.classList.add('connected');  // Else, mark as connected (green)
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching plant data:', error);
        });
}


function displaySelectedData(selectedData) {
    fetchDeviceStatuses()
        .then(plants => {
            plants.forEach(plant => {
                const gridItem = document.getElementById(plant.id);
                if (gridItem) {
                    const plantName = gridItem.className.split(' ').find(cls => cls.match(/[A-F]\d+/));
                    gridItem.innerHTML = `${plantName} - ${plant[selectedData]}`;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching plant data:', error);
        });
}



document.getElementById('data-selection').addEventListener('change', function() {
    const selectedData = this.value;
    displaySelectedData(selectedData);
});
function getDeviceData() {
    const devices = {};

    document.querySelectorAll('.grid-item').forEach((item) => {
        const [row, col] = item.id.split(',').map(Number);
        const className = letters[col] + (row + 1);
        const deviceNumber = Math.floor(row / 3) + 1 + col * 4;

        if (!devices[deviceNumber]) {
            devices[deviceNumber] = [];
        }
        devices[deviceNumber].push(className);
    });

    return Object.entries(devices).map(([device, plants]) => ({ device: Number(device), plants }));
}


function sendDeviceData() {
    const deviceData = getDeviceData();

    fetch('/save_device_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceData),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


updateGridColors();
sendDeviceData();