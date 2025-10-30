export class View {
    constructor() {
        this.searchInput = document.getElementById('city-input');
        this.searchBtn = document.getElementById('search-btn');
        this.error = document.getElementById('error');
        this.currentWeather = document.getElementById('current-weather');
        this.cityName = document.getElementById('city-name');
        this.weatherDesc = document.getElementById('weather-desc');
        this.temp = document.getElementById('temp');
        this.wind = document.getElementById('wind');
        this.addFavBtn = document.getElementById('add-fav-btn');
        this.forecast = document.getElementById('forecast');
        this.forecastCards = document.getElementById('forecast-cards');
        this.favoritesList = document.getElementById('favorites-list');
    }

    bindSearch(handler) {
        this.searchBtn.addEventListener('click', handler);
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handler();
        });
    }

    bindAddFavorite(handler) {
        this.addFavBtn.addEventListener('click', handler);
    }

    bindFavoriteClick(handler, removeHandler) {
        this.favoritesList.addEventListener('click', (e) => {
            const cityEl = e.target.closest('.city-name');
            const delBtn = e.target.closest('.delete-btn');

            if (cityEl) handler(cityEl.textContent);
            if (delBtn) {
                const city = delBtn.parentElement.querySelector('.city-name').textContent;
                removeHandler(city);
            }
        });
    }

    renderWeather(data) {
        this.error.textContent = '';
        this.currentWeather.classList.remove('d-none');
        this.forecast.classList.remove('d-none');

        this.cityName.textContent = `${data.name}, ${data.country}`;
        this.weatherDesc.textContent = `Погода: ${data.current.weathercode}`;
        this.temp.textContent = data.current.temperature;
        this.wind.textContent = data.current.windspeed;

        const bg = document.querySelector('.app-bg');
        const temp = data.current.temperature;
        if (temp > 25) bg.style.background = 'linear-gradient(to bottom, #FFD54F, #FF8A65)';
        else if (temp > 10) bg.style.background = 'linear-gradient(to bottom, #81D4FA, #4FC3F7)';
        else bg.style.background = 'linear-gradient(to bottom, #90A4AE, #78909C)';

        this.forecastCards.innerHTML = '';
        data.daily.time.forEach((day, i) => {
            const card = document.createElement('div');
            card.className = 'card p-2 text-center';
            card.style.width = '100px';
            card.innerHTML = `
        <p>${day}</p>
        <p>${data.daily.temperature_2m_min[i]}° / ${data.daily.temperature_2m_max[i]}°</p>
      `;
            this.forecastCards.appendChild(card);
        });
    }

    renderFavorites(favs) {
        this.favoritesList.innerHTML = '';
        favs.forEach(city => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
      <span class="city-name">${city}</span>
      <button class="btn btn-sm btn-outline-danger delete-btn">×</button>
    `;
            this.favoritesList.appendChild(li);
        });
    }

    showError(msg) {
        this.error.textContent = msg;
    }

    getInput() {
        return this.searchInput.value.trim();
    }

    clearInput() {
        this.searchInput.value = '';
    }
}