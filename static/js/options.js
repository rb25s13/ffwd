const causesList = '/api/fire_causes'
const yearList = '/api/year_list'
const caData = d3.json(causesList);
const yrData = d3.json(yearList);

let caSelect = document.getElementById('selFireCause');
let yrSelect = document.getElementById('selFireYear');


caData.then((a) => {
    for(let j = 0; j < a.length; j++) {
      let opt = a[j].CAUSE;
      let el = document.createElement('option');
      el.textContent = opt;
      el.value = opt;
      caSelect.appendChild(el);
  }
});


yrData.then((a) => {
    for(let j = 0; j < a.length; j++) {
      let opt = a[j].FIRE_YEAR;
      let el = document.createElement('option');
      el.textContent = opt;
      el.value = opt;
      yrSelect.appendChild(el);
  }
});