function getWeather() {
    // API key for accessing the OpenWeatherMap API
    const apiKey = '0ea2996395f33e295c6926d8621b76fa';

    // Get the city name entered by the user from the input field
    const city = document.getElementById('city').value;

    // Check if the city name is empty
    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Construct the URL for fetching current weather data
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Fetch current weather data from the API
    fetch(currentWeatherUrl)
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            // Call function to display current weather data
            displayWeather(data);
        })
        .catch(error => {
            // Handle errors during fetch operation
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });
}

// Function to display current weather data
function displayWeather(data) {
    // Get references to HTML elements
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const humidityDiv = document.getElementById('humidity');
    const windSpeedDiv = document.getElementById('wind-speed');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
    humidityDiv.innerHTML = '';
    windSpeedDiv.innerHTML = '';

    // Check if the city is not found
    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        // Extract relevant weather data
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        // Construct HTML to display temperature and weather information
        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        // Update HTML content with weather data
        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Display humidity and wind speed
        humidityDiv.innerHTML = `<p>Humidity: ${humidity}%</p>`;
        windSpeedDiv.innerHTML = `<p>Wind Speed: ${windSpeed} km/h</p>`;

        // Make the weather icon visible
        showImage();
    }
}

// Function to make the weather icon visible
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
