const api_key = `${process.env.API_KEY}`;
const baseURL = `https://api.themoviedb.org/3`;

let GENRES = [];

class Api {
  constructor() {
    this.url = '';

    this.genre = `${baseURL}/genre/movie/list?api_key=${api_key}&language=en-US`;
    this.trending = `${baseURL}/trending/movie/day?api_key=${api_key}`;
  }

  async fetchGenres() {
    this.url = this.genre;
    const response = await fetch(this.url);
    const data = await response.json();

    GENRES = data.genres;
  }

  async fetchMovies() {
    try {
      this.url = this.trending;
      const response = await fetch(this.url);
      const data = await response.json();

      // console.log(results);
      data.results = data.results.map(movie => {
        // console.log(movie);
        return {
          ...movie,
          genres: movie.genre_ids
            .slice(0, 2)
            .map(id => {
              // console.log(id);
              const movieGenre = GENRES.find(genre => genre.id === id);
              // console.log(movieGenre );
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
}

export const apiService = new Api();
