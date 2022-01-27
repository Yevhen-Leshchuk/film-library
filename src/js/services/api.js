// export const api_key = `${process.env.API_KEY}`;
export const api_key = 'c02b36da545a5844f0cde427ebff9c5c';
export const baseURL = `https://api.themoviedb.org/3`;
const ID_URL = `${baseURL}/movie/`;

let GENRES = [];

class Api {
  constructor() {
    this.url = '';
    this.page = 1;
    this.searchQuery = '';

    this.searchMovies = `${baseURL}/search/movie?api_key=${api_key}`;
    this.genre = `${baseURL}/genre/movie/list?api_key=${api_key}`;
    this.trending = `${baseURL}/trending/movie/day?api_key=${api_key}`;
    this._lang = '';
  }

  async fetchGenres() {
    this.url = `${this.genre}&language=${this._lang}`;
    const response = await fetch(this.url);
    const data = await response.json();

    GENRES = data.genres;
  }

  async fetchMovies() {
    if (this.searchQuery !== '') {
      this.url = `${this.searchMovies}&query=${this.searchQuery}&page=${this.page}&language=${this._lang}`;
    } else {
      this.url = `${this.trending}&page=${this.page}&language=${this._lang}`;
    }
    try {
      const response = await fetch(this.url);
      const data = await response.json();

      data.results = data.results.map(movie => {
        return {
          ...movie,
          genres: movie.genre_ids
            .slice(0, 2)
            .map(id => {
              const movieGenre = GENRES.find(genre => genre.id === id);
              return movieGenre?.name || '';
            })
            .join(', '),
        };
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async MovieSearchId(movieId) {
    try {
      const response = await fetch(`${ID_URL}${movieId}?api_key=${api_key}&language=${this._lang}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error with Api ID' + error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  set query(value) {
    this.searchQuery = value;
  }
}

export const apiService = new Api();
