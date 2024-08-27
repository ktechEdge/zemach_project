const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

document.querySelectorAll('.grid-item').forEach((item) => {
    const [row, col] = item.id.split(',').map(Number);
    const className = letters[col] + (row + 1);
    item.classList.add(className);
    item.textContent = className;
});

function fetchDeviceStatuses() {
    return fetch('/plants.json')
        .then(response => response.json())
        .then(data => data);
}

function updateGridColors() {
    fetchDeviceStatuses()
        .then(plants => {
            plants.forEach(plant => {
                const gridItem = document.getElementById(plant.id);
                if (gridItem) {

                    gridItem.addEventListener("click", ()=> {
                        const planID = gridItem.id;
                        window.location.href = `/plant_Status_history?id=${planID}`
                    });

                    gridItem.classList.remove('connected', 'disconnected');
                    gridItem.classList.add(plant.connected ? 'connected' : 'disconnected');
                }
            });
        })
        .catch(error => {
            console.error('Error fetching plant data:', error);
        });
}

updateGridColors();