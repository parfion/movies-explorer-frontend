const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._checkResponse = this._checkResponse.bind(this)
  }

  // проверка
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  };
  
  // получение всех фильмов
  getMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: {
        Accept: 'application/json',
      }
    })
    .then(this._checkResponse)
  }
}

const moviesApi = new MoviesApi({
	baseUrl: BASE_URL,
	headers: {
	  'Content-Type': 'application/json'
	}
  }); 

export default moviesApi;