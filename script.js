const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    try {
        const api_key = "70f66def3375301de19d56c93abd8d70";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const weather_data = await fetch(url).then(response => response.json());

        // Check if city was found
        if (weather_data.cod === 404) {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("City not found");
            return;
        }

        // Display weather data
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

        // Set weather icon based on weather condition
        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "SPJAVASCRIPT\weather\Assets\cloud.png";
                break;
            case 'Clear':
                weather_img.src = "SPJAVASCRIPT\weather\Assets\clear.png";
                break;
            case 'Rain':
                weather_img.src = "SPJAVASCRIPT\weather\Assets\rain.png";
                break;
            case 'Mist':
                weather_img.src = "SPJAVASCRIPT\weather\Assets\mist.png";
                break;
            case 'Snow':
                weather_img.src = "SPJAVASCRIPT\weather\Assets\snow.png";
                break;
            default:
                weather_img.src = "https://github.com/CodeTraversal/JavaScript-Projects/blob/main/Weather%20App/assets/default.png?raw=true";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    checkWeather(city);
});
