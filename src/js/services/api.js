const api_key = `${process.env.API_KEY}`;
const baseURL = `https://api.themoviedb.org/3`;

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
    this.url = this.genre;
    const response = await fetch(this.url);
    const data = await response.json();

    GENRES = data.genres;
  }

  async fetchMovies() {
    // console.log(typeof this.searchQuery);
    if (this.searchQuery !== '') {
      this.url = `${this.searchMovies}&query=${this.searchQuery}&page=${this.page}&language=${this._lang}`;
    } else {
      this.url = `${this.trending}&page=${this.page}&language=${this._lang}`;
    }
    try {
      // console.log(this.url);
      const response = await fetch(this.url);
      const data = await response.json();
      // this.page = data.page;

      data.results = data.results.map(movie => {
        // console.log(movie);
        return {
          ...movie,
          genres: movie.genre_ids
            .slice(0, 2)
            .map(id => {
              // console.log(id);
              const movieGenre = GENRES.find(genre => genre.id === id);
              // console.log(movieGenre);
              return movieGenre?.name || '';
            })
            .join(', '),
        };
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // incrementPage() {
  //   this.page += 1;
  // }

  resetPage() {
    this.page = 1;
  }

  set query(value) {
    this.searchQuery = value;
  }
}

export const apiService = new Api();
