export const Model = {
    GEOCODE_BASE: 'https://geocoding-api.open-meteo.com/v1/search',
    WEATHER_BASE: 'https://api.open-meteo.com/v1/forecast',

    async fetchCoords(city) {
        const url = `${this.GEOCODE_BASE}?name=${encodeURIComponent(city)}&count=1&language=uk`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Помилка мережі при пошуку міста');
        const data = await res.json();
        return (data.results && data.results[0]) || null;
    },

    async fetchWeather(lat, lon) {
        const url = `${this.WEATHER_BASE}?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Помилка мережі при завантаженні погоди');
        return await res.json();
    }
};