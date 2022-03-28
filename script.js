const weatherApiKey = "2ae743b4bdb682278613148289f35d91";


// when the user inputs a city
// then fetch data from weather api by city name
function getCurrentWeatherApi(city){
    const url = 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`;

    fetch(url).then(function(response){
        return response.json();
        console.log(response);
    })
    .then(function(res){
        console.log(res)
    });
    
}

// retrieve latitude and longitude

// then call onecallAPI in celcius
// function getOneCallApi(lat, lon) {
//     const urlOneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${weatherApiKey}`;
//     return fetch(urlOneCallApi).then(function(res) {
//         return res.json();
//     });
// }

getCurrentWeatherApi('tokyo');

//         const lon = data.coord.lon;
//         const lat = data.coord.lat;

//         return getOneCallApi(lon, lat);
//     })
//     .then(function(onecallData){
//         console.log(onecallData);
//     });

// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=2ae743b4bdb682278613148289f35d91
// data needed - 
// for today
// icon
// temp
    // convert from kelvin to celcius   
// humidity
// wind
// get weather
// uv
// change UV colour depending on severity

// for next 5 days
// icon
// temp
// humidity
// wind
// uv
// change UV colour depending on severity

// add city searched to local storage
// display in a list of buttons of previously searched cities