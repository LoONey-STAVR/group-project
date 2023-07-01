class Api {
    constructor(options) {
        this._baseURL = options.baseURL;
        this._apiKey = options.apiKey;
    }

    _request(path, parametrs) {
        return fetch(`${this._baseURL}/${path}?api_key=${this._apiKey}&${parametrs}`).then(this._getResult);
    }

    _getResult(result) {
        return result.ok ? result.json() : Promise.reject(new Error(`Что то пошло не так`));
    }

    getTrending(parametrs) {
        return this._request(`trending`, `${parametrs}`);
    }

    getSearch(parametrs) {
        return this._request('search', `${parametrs}`);
    }
    getRandomGif() {
        return this._request('random');
    }
}

const api = new Api({ baseURL: 'https://api.giphy.com/v1/gifs', apiKey: 'nJXfAbJKRU6yP8wDDe0WF0H85H1iPu9I' });
export default api;
