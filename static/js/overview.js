// data sources
const paleoData = '/api/paleo';
const spiData = '/api/spi';
const fireData = '/api/texas_fires';
const fbyData = '/api/fires_by_year';
const cbyData = '/api/causes_by_year';
const acresCauseData = '/api/acres_cause';
const acresClassData = '/api/acres_class';
const acresYearData = '/api/acres_year';
const yearData = '/api/years';

let years = [];
d3.json(yearData).then(data => {data.forEach(get => years.push(get.FIRE_YEAR))});

let fby = [];
let fbytotal = [];
d3.json(fbyData).then(data => {
    data.forEach(data => {
        fby.push(data['COUNT(fire_year)'] / 200)
        fbytotal.push(data['COUNT(fire_year)'])
    });
    d3.select('#fires-by-year-bar').html(''); // clears out old graph
    let bar = [{
        x: years,
        y: fbytotal,
        type: 'bar',
        marker: {
            color: '#D0B440',
            line: {
              color: '#4e0000',
              width: 1.5
            }
        },
    }];
    let barLayout = {
        font:{color:"white"},
        title: "Number of Texas Wildfires (1992-2015)",
        // height: 300,
        // width: 600
        plot_bgcolor:"#1E1F20",
        paper_bgcolor: "#1E1F20"
    };
    Plotly.newPlot('fires-by-year-bar', bar, barLayout);
});

let yearsums = [];
d3.json(acresYearData).then(data => {
    data.forEach(data => {
        yearsums.push(data['sum(fire_size)']);
    });
    d3.select('#acres-by-year-bar').html(''); // clears out old graph
    let year_bar = [{
        x: years,
        y: yearsums,
        type: 'bar',
        marker: {
            color: '#E67F33',
            line: {
              color: '#4e0000',
              width: 1.5
            }
        },
    }];
    let year_barLayout = {
        font:{color:"white"},
        title: "Total of Acres by Year",
        // height: 300,
        // width: 600
        plot_bgcolor:"#1E1F20",
        paper_bgcolor: "#1E1F20",
    };
    Plotly.newPlot('acres-by-year-bar', year_bar, year_barLayout);
});

let causes = [];
let causesums = [];
d3.json(acresCauseData).then(data => {
    data.forEach(data => {
        causes.push(data['STAT_CAUSE_DESCR'])
        causesums.push(data['sum(fire_size)']);
    });
    d3.select('#acres-by-cause-bar').html(''); // clears out old graph
    let cause_bar = [{
        x: causes,
        y: causesums,
        type: 'bar',
        marker: {
            color: '#CE2220',
            line: {
              color: '#4e0000',
              width: 1.5
            }
        },
    }];
    let cause_barLayout = {
        font:{color:"white"},
        title: "Total of Acres by Cause",
        // height: 300,
        // width: 600
        plot_bgcolor:"#1E1F20",
        paper_bgcolor: "#1E1F20",
    };
    Plotly.newPlot('acres-by-cause-bar', cause_bar, cause_barLayout);
});

let classes = [];
let classsums = [];
d3.json(acresClassData).then(data => {
    data.forEach(data => {
        classes.push(data['FIRE_SIZE_CLASS'])
        classsums.push(data['sum(fire_size)']);
    });
    d3.select('#acres-by-class-bar').html(''); // clears out old graph
    let class_bar = [{
        x: classes,
        y: classsums,
        type: 'bar',
        marker: {
            color: '#CE2220',
            line: {
              color: '#4e0000',
              width: 1.5
            }
        },
    }];
    let class_barLayout = {
        font:{color:"white"},
        title: "Total of Acres by Class",
        // height: 300,
        // width: 600
        plot_bgcolor:"#1E1F20",
        paper_bgcolor: "#1E1F20",
    };
    Plotly.newPlot('acres-by-class-bar', class_bar, class_barLayout);
});

// get the list of years and causes for the dropdowns
// let selYear = document.getElementById('selFireYear')
// let selCause = document.getElementById('selFireCause')
// let yearList = [];
// let causeList = [];

let countByYear = []
let arsonByYear = []
let campfireByYear = []
let smokingByYear = []
let lightningByYear = []
let equipByYear = []
let childByYear = []
let railByYear = []
let firewByYear = []
let powlineByYear = [] 



d3.json(cbyData).then(get => {
    for (let i=0;i<get.length;i++) {

        // let currYear = get[i].fire_year;
        // currCount = currYear.length;
        // countByYear.push(currCount);
        let cause = get[i]['STAT_CAUSE_DESCR'];
        let count = get[i]['COUNT(stat_cause_descr)'];

        if (cause == 'Arson'){
            arsonByYear.push(count);
        }
        else if (cause == 'Campfire'){
            campfireByYear.push(count);
        }
        else if (cause == 'Smoking'){
            smokingByYear.push(count);
        }
        else if (cause == 'Lightning'){
            smokingByYear.push(count);
        }
        else if (cause == 'Equipment Use'){
            equipByYear.push(count);
        }
        else if (cause == 'Children'){
            childByYear.push(count);
        }
        else if (cause == 'Railroad'){
            railByYear.push(count);
        }
        else if (cause == 'Fireworks'){
            firewByYear.push(count);
        }
        else if (cause == 'Powerline'){
            powlineByYear.push(count);
        }
    }

    // d3.select('#causes').html(''); // clears out old graph

    arson_trace = {
        type: 'scatter',
        x: years,
        y: arsonByYear,
        mode: 'lines',
        name: 'Arson',
        line: {
          color: '#D0B440',
          width: 2
        }
      };
      camp_trace = {
        type: 'scatter',
        x: years,
        y: campfireByYear,
        mode: 'lines',
        name: 'Campfire',
        line: {
          color: '#824D99',
          width: 2
        }
      };
      smoke_trace = {
        type: 'scatter',
        x: years,
        y: smokingByYear,
        mode: 'lines',
        name: 'Smokeing',
        line: {
          color: '#E7EBFA',
          width: 2
        }
      };
      equip_trace = {
        type: 'scatter',
        x: years,
        y: equipByYear,
        mode: 'lines',
        name: 'Equipment Use',
        line: {
          color: '#CE2220',
          width: 2
        }
      };
      child_trace = {
        type: 'scatter',
        x: years,
        y: childByYear,
        mode: 'lines',
        name: 'Children',
        line: {
          color: '#57A2AC',
          width: 2
        }
      };
      rail_trace = {
        type: 'scatter',
        x: years,
        y: railByYear,
        mode: 'lines',
        name: 'Railroads',
        line: {
          color: '#7EB875',
          width: 2
        }
      };
      fireworks_trace = {
        type: 'scatter',
        x: years,
        y: firewByYear,
        mode: 'lines',
        name: 'Fireworks',
        line: {
          color: '#B997C6',
          width: 2
        }
      };
      powerlines_trace = {
        type: 'scatter',
        x: years,
        y: powlineByYear,
        mode: 'lines',
        name: 'Powerlines',
        line: {
          color: '#E67F33',
          width: 2
        }
      };
    
      let layout = {
        font:{color:"white"},
        title: "Texas Wildfires by Cause",
        // width: 1000,
        // height: 500,
        // template='plotly_dark'
        plot_bgcolor:"#1E1F20",
        paper_bgcolor: "#1E1F20",
        xaxis: {title: 'Years', gridcolor: "grey"},
        yaxis: {title: 'Number of Wildfires', gridcolor: "grey"}
      };
      let data = [equip_trace, powerlines_trace,
        arson_trace, rail_trace, child_trace,
        camp_trace, fireworks_trace];
      Plotly.newPlot('causes', data, layout);

    
    Plotly.newPlot('causes', data, layout);
});

// console.log('aby',arsonByYear);




// d3.json(fireData).then(data => {
//     sizeAvgByYear = []
//     for (let i = 0; i < years.length; i++) {
//         // currYear = data.filter(item => item.FIRE_YEAR == years[i])
//         // currCount = currYear.length;
//         sizeTotal = 0
//         for (let i = 0; i < data.length; i++) {
//             sizeTotal = sizeTotal + data[i].FIRE_SIZE 
//         }
//         currYearAvg = sizeTotal/currCount;
//         sizeAvgByYear.push(currYearAvg);
//         console.log(`Size Avg in ${sel}:`, currYearAvg)
//     }

//     d3.select('#size-by-year').html(''); // clears out old graph

//     let trace = [{
//         type: 'scatter',
//         x: years,
//         y: sizeAvgByYear,
//         line: {
//           color: 'red',
//           width: 3
//         }
//       }];

//     let Layout = {
//         title: "Average Size by Year",
//         height: 300,
//         width: 600};
//     Plotly.newPlot('size-by-year', trace, Layout);   
// });



// plot drought and moisture data from The Living Blended Drought Product (LBDP)
d3.json(paleoData).then(data => {
    // console.log('paleo', data);
    let newData = [];
    let labels = [];
    let d0 = [];
    let d1 = [];
    let d2 = [];
    let d3 = [];
    let d4 = [];
    let w0 = [];
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let w4 = [];
    for (let a=0;a<data.length;a++) {
        curData = data[a];
        newData.push(curData);
        labels.push(curData['DATE']);
        d0.push(curData['D0']);
        d1.push(curData['D1']);
        d2.push(curData['D2']);
        d3.push(curData['D3']);
        d4.push(curData['D4']);
        w0.push(-curData['W0']);
        w1.push(-curData['W1']);
        w2.push(-curData['W2']);
        w3.push(-curData['W3']);
        w4.push(-curData['W4']);
    }

    const mapData0 = {
        labels: labels,
        datasets: [
    {
          label: 'Abnormally Dry',
          backgroundColor: 'rgb(253, 255, 0)',
          data: d0,
    },
    {
        label: 'Moderate Drought',
        backgroundColor: 'rgb(255, 204, 153)',
        data: d1,
    },
    {
        label: 'Severe Drought',
        backgroundColor: 'rgb(255, 102, 0)',
        data: d2,
    },
    {
        label: 'Extreme Drought',
        backgroundColor: 'rgb(255, 0, 0)',
        data: d3,
    },
    {
        label: 'Exceptional Drought',
        backgroundColor: 'rgb(102, 0, 0)',
        data: d4,
    },
    {
        label: 'Abnormally Wet',
        backgroundColor: 'rgb(170, 255, 85)',
        data: w0,
        hidden: true,
    },
    {
        label: 'Moderate Wet',
        backgroundColor: 'rgb(1, 255, 255)',
        data: w1,
        hidden: true,
    },
    {
        label: 'Severe Wet',
        backgroundColor: 'rgb(0, 170, 255)',
        data: w2,
        hidden: true,
    },
    {
        label: 'Extreme Wet',
        backgroundColor: 'rgb(0, 0, 255)',
        data: w3,
        hidden: true,
    },
    {
        label: 'Exceptional Wet',
        backgroundColor: 'rgb(0, 0, 170)',
        data: w4,
        hidden: true,
    },
    {
        type: 'line',
        pointStyle: 'dash',
        label: 'Fires per Year',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        data: fby
    }
    ]
    };
    const config0 = {
        type: 'bar',
        data: mapData0,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Drought in Texas from 1992-2015'
            },
            legend: {
                position:'right'
            },
          },
          responsive: true,
        }
    };
    let myChart0 = new Chart(
          document.getElementById('myChart0'),
          config0
    );
});

// plot drought and moisture data from The Standardized Precipitation Index (SPI)
d3.json(spiData).then(data => {
    // console.log('spi',data);
    let newData = [];
    let labels = [];
    let d0 = [];
    let d1 = [];
    let d2 = [];
    let d3 = [];
    let d4 = [];
    let w0 = [];
    let w1 = [];
    let w2 = [];
    let w3 = [];
    let w4 = [];
    for (let a=0;a<data.length;a++) {
        curData = data[a];
        newData.push(curData);
        labels.push(curData['DATE']);
        d0.push(curData['D0']);
        d1.push(curData['D1']);
        d2.push(curData['D2']);
        d3.push(curData['D3']);
        d4.push(curData['D4']);
        w0.push(-curData['W0']);
        w1.push(-curData['W1']);
        w2.push(-curData['W2']);
        w3.push(-curData['W3']);
        w4.push(-curData['W4']);
    }

    const mapData = {
        labels: labels,
        datasets: [
    {
          label: 'Abnormally Dry',
          backgroundColor: 'rgb(253, 255, 0)',
          data: d0,
    },
    {
        label: 'Moderate Drought',
        backgroundColor: 'rgb(255, 204, 153)',
        data: d1,
    },
    {
        label: 'Severe Drought',
        backgroundColor: 'rgb(255, 102, 0)',
        data: d2,
    },
    {
        label: 'Extreme Drought',
        backgroundColor: 'rgb(255, 0, 0)',
        data: d3,
    },
    {
        label: 'Exceptional Drought',
        backgroundColor: 'rgb(102, 0, 0)',
        data: d4,
    },
    {
          label: 'Abnormally Wet',
          backgroundColor: 'rgb(170, 255, 85)',
          data: w0,
    },
    {
        label: 'Moderate Wet',
        backgroundColor: 'rgb(1, 255, 255)',
        data: w1,
    },
    {
        label: 'Severe Wet',
        backgroundColor: 'rgb(0, 170, 255)',
        data: w2,
    },
    {
        label: 'Extreme Wet',
        backgroundColor: 'rgb(0, 0, 255)',
        data: w3,
    },
    {
        label: 'Exceptional Wet',
        backgroundColor: 'rgb(0, 0, 170)',
        data: w4,
    },
    // {
    //     type: 'line',
    //     label: 'Fires per Year',
    //     backgroundColor: 'rgba(75, 192, 192, 0.5)',
    //     fill: true,
    //     borderColor: 'rgb(75, 192, 192)',
    //     tension: 0.1,
    //     data: fby
    // }
    ]
    };
    const config = {
        type: 'bar',
        data: mapData,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Drought in Texas from 1992-2015'
            },
            legend: {
                position:'right'
            },
          },
          responsive: true,
        }
    };
    let myChart = new Chart(
          document.getElementById('myChart'),
          config
    );
});