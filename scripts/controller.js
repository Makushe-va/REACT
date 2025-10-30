import { Model } from './model.js';
import { View } from './view.js';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindSearch(() => this.onSearch());
        this.view.bindAddFavorite(() => this.onAddFavorite());
        this.view.bindFavoriteClick(
            (city) => this.onFavoriteClick(city),
            (city) => this.onRemoveFavorite(city)
        );

        this.init();
    }

    async init() {
        const favs = this.model.getFavorites();
        this.view.renderFavorites(favs);

        if (favs.length > 0) {
            this.onFavoriteClick(favs[0]);
        }
    }

    async onSearch() {
        const city = this.view.getInput();
        if (!city) return;
        try {
            const data = await this.model.getWeather(city);
            this.view.renderWeather(data);
            this.view.clearInput();
        } catch (err) {
            this.view.showError('Місто не знайдено');
        }
    }

    async onAddFavorite() {
        const city = this.view.cityName.textContent.split(',')[0];
        if (!city) return;
        this.model.addFavorite(city);
        this.view.renderFavorites(this.model.getFavorites());
    }

    async onFavoriteClick(city) {
        try {
            const data = await this.model.getWeather(city);
            this.view.renderWeather(data);
        } catch (err) {
            this.view.showError('Не вдалося завантажити дані');
        }
    }
    onRemoveFavorite(city) {
        this.model.removeFavorite(city);
        this.view.renderFavorites(this.model.getFavorites());
    }
}

const app = new Controller(new Model(), new View());