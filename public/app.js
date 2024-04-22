window.onload = function () {
    loadUserData();
    loadChartData();
};

function loadUserData() {
    fetch('/get-user-info')
        .then(response => response.json())
        .then(data => {
            document.getElementById('username').textContent = data.username;
        });
}

function loadChartData() {
    fetch('/get-exercise-data')
        .then(response => response.json())
        .then(data => {
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Your Weekly Exercise Duration"
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
        });
}
