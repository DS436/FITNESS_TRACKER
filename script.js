// JavaScript code for interacting with the DOM and handling user interactions

// Example: Log activity form submission
document.getElementById('activityForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    // Retrieve input values
    const activityType = document.getElementById('activityType').value;
    const duration = document.getElementById('duration').value;
    const intensity = document.getElementById('intensity').value;
    const notes = document.getElementById('notes').value;

    // Send activity data to backend (AJAX request)
    fetch('/log-activity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            activityType: activityType,
            duration: duration,
            intensity: intensity,
            notes: notes
        })
    })
    .then(response => {
        if (response.ok) {
            console.log('Activity logged successfully');
            // Update dashboard or display success message
        } else {
            console.error('Failed to log activity');
            // Handle error (display error message, retry submission, etc.)
        }
    })
    .catch(error => {
        console.error('Error logging activity:', error);
        // Handle error (display error message, retry submission, etc.)
    });
});
