export const View = (() => {
    const refs = {
        cityInput: null,
        searchBtn: null,
        error: null,
        currentCard: null,
        cityName: null,
        weatherDesc: null,
        temp: null,
        wind: null,
        addFavBtn: null,
        forecast: null,
        forecastCards: null,
        favoritesList: null,
        appBg: null
    };

    function init() {
        refs.cityInput = document.getElementById('city-input');
        refs.searchBtn = document.getElementById('search-btn');
        refs.error = document.getElementById('error');
        refs.currentCard = document.getElementById('current-weather');
        refs.cityName = document.getElementById('city-name');
        refs.weatherDesc = document.getElementById('weather-desc');
        refs.temp = document.getElementById('temp');
        refs.wind = document.getElementById('wind');
        refs.addFavBtn = document.getElementById('add-fav-btn');
        refs.forecast = document.getElementById('forecast');
        refs.forecastCards = document.getElementById('forecast-cards');
        refs.favoritesList = document.getElementById('favorites-list');
        refs.appBg = document.getElementById('app');
    }

    function clearError() { refs.error.textContent = ''; }
    function showError(msg) { refs.error.textContent = msg; }

    function renderCurrent(cityObj, weatherData) {
        refs.currentCard.classList.remove('d-none');
        refs.cityName.textContent = `${cityObj.name}, ${cityObj.country}`;
        const cw = weatherData.current_weather;
        const desc = mapWeatherCodeToDesc(cw.weathercode);
        refs.weatherDesc.textContent = desc.text;
        refs.temp.textContent = Math.round(cw.temperature);
        refs.wind.textContent = (cw.windspeed ?? 0).toFixed(1);
        refs.addFavBtn.dataset.city = JSON.stringify({
            name: cityObj.name,
            country: cityObj.country,
            lat: cityObj.latitude,
            lon: cityObj.longitude
        });
        renderForecast(weatherData.daily);
        updateBackground(desc.kind);
    }

    function renderForecast(daily) {
        if (!daily || !daily.time) return;
        refs.forecast.classList.remove('d-none');
        refs.forecastCards.innerHTML = '';
        daily.time.forEach((date, i) => {
            const min = Math.round(daily.temperature_2m_min[i]);
            const max = Math.round(daily.temperature_2m_max[i]);
            const card = document.createElement('div');
            card.className = 'card p-2';
            card.innerHTML = `<div class="card-body p-2"><strong>${date}</strong><div>min: ${min}°C</div><div>max: ${max}°C</div></div>`;
            refs.forecastCards.appendChild(card);
        });
    }

    function updateBackground(kind) {
        refs.appBg.classList.remove('bg-sunny','bg-rain','bg-snow','bg-cloudy');
        switch (kind) {
            case 'sunny': refs.appBg.classList.add('bg-sunny'); break;
            case 'rain': refs.appBg.classList.add('bg-rain'); break;
            case 'snow': refs.appBg.classList.add('bg-snow'); break;
            default: refs.appBg.classList.add('bg-cloudy');
        }
    }

    function mapWeatherCodeToDesc(code) {
        if (code === 0) return { kind: 'sunny', text: 'Ясно' };
        if (code >= 1 && code <= 3) return { kind: 'sunny', text: 'Переважно ясно' };
        if ((code >= 51 && code <= 67) || (code >= 80 && code <= 99)) return { kind: 'rain', text: 'Дощ/Злива' };
        if (code >= 71 && code <= 77) return { kind: 'snow', text: 'Сніг' };
        return { kind: 'cloudy', text: 'Хмарно' };
    }

    function renderFavorites(list) {
        refs.favoritesList.innerHTML = '';
        if (!list || list.length === 0) {
            refs.favoritesList.innerHTML = '<li class="list-group-item">Порожньо</li>';
            return;
        }
        list.forEach((it, idx) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `<span>${it.name}, ${it.country}</span>
        <button class="btn btn-sm btn-outline-danger ms-2 btn-remove" data-idx="${idx}">Видалити</button>`;
            refs.favoritesList.appendChild(li);
        });
    }

    return {
        init,
        refs,
        clearError,
        showError,
        renderCurrent,
        renderFavorites
    };
})();