import { Model } from './model.js';
import { View } from './view.js';

const Controller = (() => {
    let favorites = [];

    function bindEvents() {
        const r = View.refs;
        r.searchBtn.addEventListener('click', onSearch);
        r.cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') onSearch(); });
        r.addFavBtn.addEventListener('click', onAddFav);
        r.favoritesList.addEventListener('click', onFavoritesClick);
    }

    async function onSearch() {
        const r = View.refs;
        View.clearError();
        const city = r.cityInput.value.trim();
        if (!city) { View.showError('Введіть назву міста'); return; }
        try {
            const coords = await Model.fetchCoords(city);
            if (!coords) { View.showError('Місто не знайдено'); return; }
            const weather = await Model.fetchWeather(coords.latitude, coords.longitude);
            View.renderCurrent(coords, weather);
        } catch (err) {
            console.error(err);
            View.showError(err.message || 'Сталася помилка');
        }
    }

    function onAddFav() {
        const data = View.refs.addFavBtn.dataset.city;
        if (!data) return;
        const cityObj = JSON.parse(data);
        const exists = favorites.some(f => f.name === cityObj.name && f.country === cityObj.country);
        if (!exists) {
            favorites.unshift(cityObj);
            View.renderFavorites(favorites);
        }
    }

    function onFavoritesClick(e) {
        const t = e.target;
        if (t.classList.contains('btn-remove')) {
            const idx = Number(t.dataset.idx);
            favorites.splice(idx, 1);
            View.renderFavorites(favorites);
        }
    }

    function start() {
        View.init();
        View.renderFavorites(favorites);
        bindEvents();
    }

    return { start };
})();

document.addEventListener('DOMContentLoaded', () => Controller.start());