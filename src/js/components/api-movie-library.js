import { movieLibrary } from './movie-library.js';
import { baseUrlBackend } from './user-auth.js';

export function setToLibrary(id, token, status, movie) {
  const addMovieApi = {
    apiFilmId: id,
    status: status,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addMovieApi),
  };

  return fetch(`${baseUrlBackend}/api/v1/films`, options)
    .then(res => res.json())
    .then(data => {
      if (data.code === 201 && data.status === 'success') {
        const userMovie = data.data.film;

        setMovieToUserStorage(userMovie);

        if (status === 'queued') {
          movieLibrary._queueStorage.push(movie);
          localStorage.setItem('queueStorage', JSON.stringify(movieLibrary._queueStorage));
        }
        if (status === 'watched') {
          movieLibrary._watchedStorage.push(movie);
          localStorage.setItem('watchedStorage', JSON.stringify(movieLibrary._watchedStorage));
        }
      }
    })
    .catch(error => console.log('error from films', error));
}

export function deleteMovieFromLibrary(token, status, _id) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(`${baseUrlBackend}/api/v1/films/${_id}`, options)
    .then(res => res.json())
    .then(data => {
      if (data.code === 200 && data.status === 'success') {
        if (status === 'queued') {
          movieLibrary._deletedQueueMovie = true;
          movieLibrary._clearQueueStorage();
        }
        if (status === 'watched') {
          movieLibrary._deletedWatchedMovie = true;
          movieLibrary._clearWatchedStorage();
        }
      }
    })
    .catch(error => console.log('error from delete movie', error));
}

function setMovieToUserStorage(userMovie) {
  const userStorage = localStorage.getItem('user');
  let userData = JSON.parse(userStorage);

  userData.films.push(userMovie);

  localStorage.setItem('user', JSON.stringify(userData));
}
