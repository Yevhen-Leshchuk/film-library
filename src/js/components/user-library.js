import { apiService } from '../services/api';

let queueMoviesStorage = [];
let watchedMoviesStorage = [];

export function getUserLibrary(movies) {
  const userQueuedLbr = movies.data.user.films.filter(movie => {
    if (movie.status.includes('queued')) {
      return movie;
    }
  });
  userQueuedLbr.map(movie => {
    apiService
      .MovieSearchId(movie.apiFilmId)
      .then(result => {
        const genres = result.genres.map(item => item.name).slice(0, 2);
        result.genres = genres.join(', ');

        queueMoviesStorage.push(result);

        localStorage.setItem('queueStorage', JSON.stringify(queueMoviesStorage));
      })
      .catch(error => console.log(error));
  });

  const userWatchedLbr = movies.data.user.films.filter(movie => {
    if (movie.status.includes('watched')) {
      return movie;
    }
  });

  userWatchedLbr.map(movie => {
    apiService
      .MovieSearchId(movie.apiFilmId)
      .then(result => {
        const genres = result.genres.map(item => item.name).slice(0, 2);
        result.genres = genres.join(', ');

        watchedMoviesStorage.push(result);

        localStorage.setItem('watchedStorage', JSON.stringify(watchedMoviesStorage));
      })
      .catch(error => console.log(error));
  });
  queueMoviesStorage = [];
  watchedMoviesStorage = [];
}

function changeLangForUserLbr() {
  const storageQue = localStorage.getItem('queueStorage');
  const movieQueStorage = JSON.parse(storageQue) || [];
  const storageWat = localStorage.getItem('watchedStorage');
  const movieWatStorage = JSON.parse(storageWat) || [];

  if (apiService._lang === 'ru-RU') {
    movieQueStorage.map(movie => {
      apiService
        .MovieSearchId(movie.id)
        .then(result => {
          const genres = result.genres.map(item => item.name).slice(0, 2);
          result.genres = genres.join(', ');
          // throw new Error('Error fetching data'); для проверки работы catch

          localStorage.removeItem('queueStorage');

          queueMoviesStorage.push(result);

          localStorage.setItem('queueStorage', JSON.stringify(queueMoviesStorage));
        })
        .catch(error => console.log('error ru queue', error));
    });
  }

  if (apiService._lang === 'en-US') {
    movieQueStorage.map(movie => {
      apiService
        .MovieSearchId(movie.id)
        .then(result => {
          const genres = result.genres.map(item => item.name).slice(0, 2);
          result.genres = genres.join(', ');

          localStorage.removeItem('queueStorage');

          queueMoviesStorage.push(result);

          localStorage.setItem('queueStorage', JSON.stringify(queueMoviesStorage));
        })
        .catch(error => console.log('error en queue', error));
    });
  }

  if (apiService._lang === 'ru-RU') {
    movieWatStorage.map(movie => {
      apiService
        .MovieSearchId(movie.id)
        .then(result => {
          const genres = result.genres.map(item => item.name).slice(0, 2);
          result.genres = genres.join(', ');

          localStorage.removeItem('watchedStorage');

          watchedMoviesStorage.push(result);

          localStorage.setItem('watchedStorage', JSON.stringify(watchedMoviesStorage));
        })
        .catch(error => console.log('error ru watched', error));
    });
  }

  if (apiService._lang === 'en-US') {
    movieWatStorage.map(movie => {
      apiService
        .MovieSearchId(movie.id)
        .then(result => {
          const genres = result.genres.map(item => item.name).slice(0, 2);
          result.genres = genres.join(', ');

          localStorage.removeItem('watchedStorage');

          watchedMoviesStorage.push(result);

          localStorage.setItem('watchedStorage', JSON.stringify(watchedMoviesStorage));
        })
        .catch(error => console.log('error en watched', error));
    });
  }
  queueMoviesStorage = [];
  watchedMoviesStorage = [];
}

changeLangForUserLbr();
