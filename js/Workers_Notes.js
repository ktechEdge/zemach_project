document.getElementById('noteForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    const workerName = document.getElementById('worker_name').value.trim();
    const note = document.getElementById('note').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const column = document.getElementById('column').value;
    const row = document.getElementById('row').value;

    if (!workerName || !note || !date || !time || !column || !row) {
        alert('Please fill in the Worker Name, Note, Date, Time, Column, and Row.');
    } else {
        alert(`Note Submitted Successfully!\n\nWorker Name: ${workerName}\nNote: ${note}\nDate: ${date}\nTime: ${time}\nLocation: Column ${column}, Row ${row}`);
    }
});
