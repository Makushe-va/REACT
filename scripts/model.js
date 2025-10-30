export class Model {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    }

    async getCityCoords(city) {
        const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=uk`
        );
        const data = await res.json();
        if (!data.results || data.results.length === 0) throw new Error('Місто не знайдено');
        const { latitude, longitude, name, country } = data.results[0];
        return { latitude, longitude, name, country };
    }

    async getWeather(city) {
        const coords = await this.getCityCoords(city);
        const { latitude, longitude, name, country } = coords;

        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        const data = await res.json();

        return {
            name,
            country,
            current: data.current_weather,
            daily: data.daily,
        };
    }

    addFavorite(city) {
        if (!this.favorites.includes(city)) {
            this.favorites.push(city);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        }
    }

    getFavorites() {
        return this.favorites;
    }

    removeFavorite(city) {
        this.favorites = this.favorites.filter(c => c !== city);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
}