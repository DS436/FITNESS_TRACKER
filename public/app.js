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
                    text: "Weekly Exercise Summary"
                },
                axisY: {
                    title: "Minutes"
                },
                data: [{
                    type: "splineArea", // Change type for better visualization
                    showInLegend: true,
                    dataPoints: data.map(item => ({ label: item.date, y: item.duration }))
                }]
            });
            chart.render();
        });
}
