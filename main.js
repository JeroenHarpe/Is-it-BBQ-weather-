document.querySelector('#btn').addEventListener('click', fetchFunction);

function getUrl() {
    let location = document.getElementById('getLocation').value
    let url = `http://api.apixu.com/v1/forecast.json?key=c03a1c43ebd94ad59eb80153190204&q=${location}&days=1`;
    return url;
}

function fetchFunction() {
    fetch(getUrl())
        .then(response => response.json())
        .then(data => {

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
            document.getElementById('precipitation').append(`${precipitation} mm of rain` );

            if (maxTemp > 20 && precipitation <= 0.1) {
                document.getElementById('answer').innerHTML = "Yes!";
                document.getElementById('answer').style.color = 'green';
                document.getElementById('output').style.display = 'block'
            } else {
                document.getElementById('answer').innerHTML = "No!";
                document.getElementById('answer').style.color = 'red';
                document.getElementById('output').style.display = 'block'
            }


           
        })
        .catch(error => console.log('error'))
}