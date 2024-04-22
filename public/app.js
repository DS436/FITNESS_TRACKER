window.onload = function () {
    loadChartData();
};

function loadChartData() {
    fetch('/get-exercise-data')
        .then(response => response.json())
        .then(data => {
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Your Exercise Duration"
                },
                axisY: {
                    title: "Duration in Minutes",
                    includeZero: false
                },
                data: [{
                    type: "column",
                    dataPoints: data
                }]
            });
            chart.render();

            updateExerciseList(data);  // Update the list/table of data
        });
}

function updateExerciseList(data) {
    const listContainer = document.createElement('ul');
    data.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Date: ${item.label}, Duration: ${item.y} minutes`;
        listContainer.appendChild(listItem);
    });
    document.body.appendChild(listContainer);
}
