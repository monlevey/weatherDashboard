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

// async function oneCall(lon, lat) {

//     const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

//        const response = await fetch(url);
//     return await response.json();
// }



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
        const lat = data.coord.lat;
        const long = data.coord.lon;
            console.log(lat);
            console.log(long);
            getForecast(lat, long);
    });
});
// then call onecallAPI in celcius

function getForecast(lat, long){
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${weatherApiKey}`;
    getWeatherText(url);
}

async function getWeatherText(url) {
    let weatherObject = await fetch(url);
    let weatherText = await weatherObject.text();
    console.log(weatherText);
    parseWeather(weatherText);
}

let parseWeather = function(weatherText) {
    let weatherJSON = JSON.parse(weatherText);
    let dailyForecast = weatherJSON.daily;
    console.log(dailyForecast);
    for (x = 0; x < 5; ++x) {
        let day = dailyForecast[x];
        let today = new Date().getDay() + x;
        if (today > 6) {
            today = today - 7;
        }
        console.log("today is",today);
        let dayOfWeek = getDayOfWeek(today);
        let description = day.weather[0].description;
        let icon = day.weather[0].icon;
        let sunset = timestampToTime(day.sunset);
        let highTemp = day.temp.max;
        let lowTemp = day.temp.min;
        let humidity = day.humidity;
        displayWeatherDay(dayOfWeek, description, icon, sunset, highTemp, lowTemp, humidity)
    }
}

let displayWeatherDay = function(dayOfWeek, description, icon, sunset, highTemp, lowTemp, humidity){
    let out = "<div class='weatherDay'><img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>"
    out += "<h2>" + dayOfWeek + "</h2>";
    out += "<h3>" + description + "</h3>";
    out += "<p>Sunset: " + sunset + "</p>";
    out += "<p>High Temperature: " + highTemp + "°C</p>";
    out += "<p>Low Temperature: " + lowTemp + "°C</p>";
    out += "<p>Humidity: " + humidity + "%</p>";
    document.getElementById("forecast").innerHTML += out;
    
}

let getDayOfWeek = function(dayNum) {
    var weekday = new Array(7);
    weekday[0] = "Sunday"
    weekday[1] = "Monday"
    weekday[2] = "Tuesday"
    weekday[3] = "Wednesday"
    weekday[4] = "Thursday"
    weekday[5] = "Friday"
    weekday[6] = "Saturday"

    return weekday[dayNum];

}

let timestampToTime = function(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = "";
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    } else {
        minutes = date.getMinutes();
    }
    return hours +  ";" + minutes;
}


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