document.getElementById("getWeatherButton").addEventListener("click", function() {
    // You would need to replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = "1f66dd79358380ec43a3317593f2c586";
    
    // Retrieve the user's location (latitude and longitude)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error();
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Make an API request to OpenWeatherMap to get the weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Display weather information
            const tempC = Math.round(data.main.temp - 273.15);
            const tempF = Math.round((tempC * 9/5) + 32);
            const windMph = Math.round(data.wind.speed * 2.23694);

            document.getElementById("weatherResult").innerHTML = `
                <p>Temperature: ${tempC}°C / ${tempF}°F</p>
                <p>Precipitation: N/A</p>
                <p>Wind Speed: ${windMph} mph</p>
                <p>Current Conditions: ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherResult").innerHTML = "Error fetching weather data.";
        });
    }

    function error() {
        document.getElementById("weatherResult").innerHTML = "Location not available. Please enter a city name.";
    }
});
