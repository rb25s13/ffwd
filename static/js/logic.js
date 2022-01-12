// data sources
const fireData = '/api/texas_fires';
const fbyData = '/api/fires_by_year';
const cbyData = '/api/causes_by_year';
const yearData = '/api/years';

function init(){
    // pull data from the samples.json file
    initUrl = `${fireData}/1992`;
    d3.json(initUrl).then(data => {
        optionChanged(1992);
    })
};

init();

let years = [];
d3.json(yearData).then(data => {data.forEach(get => years.push(get.FIRE_YEAR))});

let fby = [];
let fbytotal = [];
d3.json(fbyData).then(data => {
    data.forEach(data => {
        fby.push(data.count / 200)
        fbytotal.push(data.count)
    });
});


let selectM = d3.select('.mapContainer');
let selectfbs = d3.select('.fbsCont');
let selectfbc = d3.select('.fbcCont');
let selectfbt = d3.select('.fbtCont');

// function to update map based on dropdown selection
function optionChanged(sel) {

    $('#map').remove();
    $('#fires-by-size').remove();
    $('#fires-by-cause-bar').remove();
    $('#cause-by-year-plot').remove();

    selectM.append('div').attr('id', 'map');

    let myMap = L.map('map', {
        center: [31.14, -100.27],
        zoom: 6,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = () => {
        let div = L.DomUtil.create("div", "info legend");
        let legendInfo = "<p>Class</p>" +
            "<div class=\"labels\">" +
            "</div>";
        div.innerHTML = legendInfo;
        let categories = ['A','B','C','D','E', 'F', 'G'];
        let colors = ['#a3f600','#dcf400','#f7db11','#fdb72a','#fca35d','#ff5f65', '#ff020c'];
        let labels = [];
        categories.forEach((a, index) => {
            labels.push("<li><div style=\"background-color: " + colors[index] + "\"></div>&nbsp;&nbsp;" + categories[index] + "</li>");
        });
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };
    legend.addTo(myMap);
    let optionUrl = `${fireData}/${sel}`;

    d3.json(optionUrl).then(data => {
        // console.log('firedata',data);

        for (let i=0;i<data.length;i++) {
            let location = [data[i].LATITUDE, data[i].LONGITUDE];
            let year = data[i].FIRE_YEAR;
            let fireSize = data[i].FIRE_SIZE;
            let fireSizeClass = data[i].FIRE_SIZE_CLASS;
            let cause = data[i].STAT_CAUSE_DESCR;
            let color = '';
            if (fireSizeClass == 'A') {
              color = '#a3f600';
            } else if (fireSizeClass == 'B') {
                color = '#dcf400';
            } else if (fireSizeClass == 'C') {
                color = '#f7db11';
            } else if (fireSizeClass == 'D') {
                color = '#fdb72a';
            } else if (fireSizeClass == 'E') {
                color = '#fca35d';
            } else if (fireSizeClass == 'F') {
                color = '#ff5f65';
            } else {
              color = '#ff020c';
            }
            // if (year == sel) {
                L.circle(location, {
                    fillOpacity: .5,
                    color: color,
                    fillColor: color,
                    radius: fireSize / 640
                }).bindPopup(`<h3>${cause}</h3><hr><p>
                <b>Fire Size Class:</b> ${fireSizeClass}<br/><b>Fire Size:</b> ${fireSize} (Estimate of acres)<br/><b>Location:</b> ${location}</p>`).addTo(myMap);
            // }
            // if (cause == sel) {
                L.circle(location, {
                    fillOpacity: .5,
                    color: color,
                    fillColor: color,
                    radius: fireSize / 640
                }).bindPopup(`<h3>${cause}</h3><hr><p>
                <b>Fire Size Class:</b> ${fireSizeClass}<br/><b>Fire Size:</b> ${fireSize} (Estimate of acres)<br/><b>Location:</b> ${location}</p> ${year}`).addTo(myMap);
            // }

        }

;
  
// __________________________________________________________________________
        if (!isNaN(sel)) {
            $('#cause-by-year-plot').remove();
            selectfbs.append('div').attr('id', 'fires-by-size');
            selectfbc.append('div').attr('id', 'fires-by-cause-bar');

            fireSizeCount = []
            sizeClass = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            for (let i = 0; i < sizeClass.length; i++) {
                currCount = data.filter(item => item.FIRE_SIZE_CLASS == sizeClass[i]).length;
                fireSizeCount.push(currCount);
            }

            // d3.select('#fires-by-size').html(''); // clears out old graph
            let bar = [{
                x: sizeClass,
                y: fireSizeCount,
                type: 'bar',
                marker: {
                    color: '#CE2220',
                    line: {
                      color: '#4e0000',
                      width: 1.5
                    }
                },
            }];
            let barLayout = {
                font:{color:"white"},
                title: `Fires by Size in ${sel}`,
                // height: 300,
                // width: 600
                plot_bgcolor:"#1E1F20",
                paper_bgcolor: "#1E1F20",
            };
            Plotly.newPlot('fires-by-size', bar, barLayout);
    // __________________________________________________________________________
            fireCauseCount = []
            causeList = ['Arson', 'Campfire', 'Smoking', 'Lightning',
                'Equipment Use', 'Children', 'Railroad',
                'Fireworks', 'Powerline']
            // loop thru, filter and return
            // the number of fires in each year
            for (let i = 0; i < causeList.length; i++) {
                currCount = data.filter(item => item.STAT_CAUSE_DESCR == causeList[i]).length;
                fireCauseCount.push(currCount);
            }
    
            // d3.select('#fires-by-cause-bar').html(''); // clears out old graph
            let bar2 = [{
                x: causeList,
                y: fireCauseCount,
                type: 'bar',
                marker: {
                    color: '#CE2220',
                    line: {
                      color: '#4e0000',
                      width: 1.5
                    }
                },
            }];
            let barLayout2 = {
                font:{color:"white"},
                title: `Fires by Cause in ${sel}`,
                // height: 300,
                // width: 600
                plot_bgcolor:"#1E1F20",
                paper_bgcolor: "#1E1F20",
            };
            Plotly.newPlot('fires-by-cause-bar', bar2, barLayout2);
        }  
        if (isNaN(sel)) {
            $('#fires-by-size').remove();
            $('#fires-by-cause-bar').remove();
            $('#cause-by-year-plot').remove();
            // __________________________________________________________________________
            selectfbs.append('div').attr('id', 'fires-by-size');
            fireSizeCount = []
            sizeClass = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
            for (let i = 0; i < sizeClass.length; i++) {
                currCount = data.filter(item => item.FIRE_SIZE_CLASS == sizeClass[i]).length;
                fireSizeCount.push(currCount);
            }

            // d3.select('#fires-by-size').html(''); // clears out old graph
            let bar = [{
                x: sizeClass,
                y: fireSizeCount,
                type: 'bar',
                marker: {
                    color: '#CE2220',
                    line: {
                      color: '#4e0000',
                      width: 1.5
                    }
                },
            }];
            let barLayout = {
                font:{color:"white"},
                title: `Fires by Size - ${sel}`,
                // height: 300,
                // width: 600
                plot_bgcolor:"#1E1F20",
                paper_bgcolor: "#1E1F20",
            };
            Plotly.newPlot('fires-by-size', bar, barLayout);
            // __________________________________________________________________________
            selectfbc.append('div').attr('id', 'cause-by-year-plot');

            causeCountByYear = []
            for (let i = 0; i < years.length; i++) {
                currCount = data.filter(item => item['FIRE_YEAR'] == years[i]).length;
                causeCountByYear.push(currCount);
            }
            // d3.select('#cause-by-year-plot').html(''); // clears out old graph
            let bar3 = [{
                x: years,
                y: causeCountByYear,
                type: 'bar',
                marker: {
                    color: '#CE2220',
                    line: {
                      color: '#4e0000',
                      width: 1.5
                    }
                },
            }];
            let barLayout3 = {
                font:{color:"white"},
                title: `# of Fires Caused by ${sel}`,
                // height: 300,
                // width: 600
                plot_bgcolor:"#1E1F20",
                paper_bgcolor: "#1E1F20",
            };
            Plotly.newPlot('cause-by-year-plot', bar3, barLayout3);
        }
        // loop thru each year, filter and return
        // the number of fires in each year
        
    });

}
optionChanged();


// d3.json(fireData).then(data => {
//     // __________________________________________________________________________
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
//         font:{color:"white"},
//         title: "Average Size by Year",
//         // height: 300,
//         // width: 600
//         plot_bgcolor:"#1E1F20",
//         paper_bgcolor: "#1E1F20",
//     };
//     Plotly.newPlot('size-by-year', trace, Layout);   
// })
