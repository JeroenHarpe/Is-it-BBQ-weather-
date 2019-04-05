const btn = document.getElementById("btn");
getLocation.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   resetData();
   fetchFunction();
  }
});


btn.addEventListener('click', () => {
    resetData();
    fetchFunction();
});


function getUrl() {
    let location = document.getElementById('getLocation').value;
    let url = `https://api.apixu.com/v1/forecast.json?key=c03a1c43ebd94ad59eb80153190204&q=${location}&days=1`;
    return url;
}

let answer = document.getElementById('answer');
let output = document.getElementById('output');


function fetchFunction() {
    fetch(getUrl())
        .then(response => response.json())
        .then(data => {
            outputData(data);
        })
        .catch(error => console.log('error'))
}

let resetData = () => {
    let nodes = document.querySelector('#output').childNodes;
    nodes.forEach(element => {
        element.innerHTML = '';
        element.src = '';
    });
}

let outputData = (data) => {


    let cityData = JSON.stringify(data.location.name);
    let countryData = JSON.stringify(data.location.country);
    cityData = cityData.replace(/\"/g, "");
    countryData = countryData.replace(/\"/g, "");
    document.getElementById("location").append(`${cityData}, ${countryData}`);

    const dateOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    let date = new Date(data.forecast.forecastday[0].date_epoch * 1000);
    date = date.toLocaleDateString('en-GB', dateOptions);
    document.getElementById("date").append(date);

    let icon = data.forecast.forecastday[0].day.condition.icon;
    let getImg = document.getElementById('icon');
    getImg.src = `http:${icon}`;

    let maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
    document.getElementById('maxTemp').append(`${maxTemp} °C`);

    let precipitation = data.forecast.forecastday[0].day.totalprecip_mm;
    document.getElementById('precipitation').append(`${precipitation} mm of rain`);


    if (maxTemp > 20 && precipitation <= 0.1) {
        answer.innerHTML = "Yes!";
        answer.style.color = 'green';
        output.style.display = 'block'
    } else {
        answer.innerHTML = "No!";
        answer.style.color = 'red';
        output.style.display = 'block'
    }

}