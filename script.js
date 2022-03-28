const formSearch = document.getElementById('form-search');
const inputCity = document.getElementById('input-city');
const h2CityToday = document.getElementById("h2-city-today");
const spanDateToday = document.getElementById("span-date-today");
const spantodayTemp = document.getElementById("span-today-temp");
const spantodayWind = document.getElementById("span-today-wind");
const spantodayHumidity = document.getElementById("span-today-humidity");
const spantodayUv = document.getElementById("span-today-uv");
const weatherCards = document.getElementById("weather-cards");





const weatherApiKey = "2ae743b4bdb682278613148289f35d91";

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = dd + '-' + mm + '-' + yyyy;
spanDateToday.textContent = today;


// when the user inputs a city
// then fetch data from weather api by city name
function getCurrentWeatherApi(city){
    const url = 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

    return fetch(url).then(function(response){
        return response.json();
        console.log(response);
    });
    
}

async function oneCall(lon, lat) {

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

       const response = await fetch(url);
    return await response.json();
}



// retrieve latitude and longitude
formSearch.addEventListener('submit', function(event){
    event.preventDefault();
    const city = inputCity.value;
    getCurrentWeatherApi(city)
    .then(function(data){
        console.log('data is', data);
        h2CityToday.textContent = city.toUpperCase();
        spantodayWind.textContent = data.wind.speed;
        spantodayTemp.textContent = data.main.temp;
        spantodayHumidity.textContent = data.main.humidity;
    });
});
// then call onecallAPI in celcius






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