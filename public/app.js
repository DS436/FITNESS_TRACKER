window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Weekly Exercise Duration"
        },
        axisY:{
            title: "Duration in Minutes",
            includeZero: false
        },
        data: [{        
            type: "column",  
            dataPoints: [
                { label: "Monday",  y: 60  },
                { label: "Tuesday", y: 45  },
                { label: "Wednesday", y: 30  },
                { label: "Thursday", y: 65  },
                { label: "Friday", y: 60  },
                { label: "Saturday", y: 30  },
                { label: "Sunday", y: 90  }
            ]
        }]
    });
    chart.render();
};
