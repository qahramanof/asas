const unsplashAccessKey = 'IgvQD20Y17MQI_9uH94wW64xTLNNL3E2P5wlYZ76b40'; // Unsplash Access Key
const weatherAPIKey = '9a98e395722125c9e231cc158de049ac'; // OpenWeatherMap API Key

async function fetchData() {
    const cityName = document.getElementById('city-input').value;
    const image = await fetchCityImage(cityName);
    const weather = await fetchWeatherData(cityName);

    document.getElementById('city-image').src = image;
    document.getElementById('weather-data').innerText = `Hava şəraiti: ${weather.temp}°C`;
}

async function fetchCityImage(cityName) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashAccessKey}`);
    const data = await response.json();

    if (data.results.length > 0) {
        return data.results[0].urls.small;
    }
    return '';
}

async function fetchWeatherData(cityName) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${weatherAPIKey}`);
    const data = await response.json();

    if (data.main) {
        return data.main;
    }
    else {
        console.error('Hava şəraiti haqqında məlumat əldə oluna bilmədi. Cavab:', data);
        return { temp: 'Bilinmir' };
    }
}