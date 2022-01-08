import refs from '../refs';
import { getRefs } from '../refs';
import movieCard from '../../templates/movie-card.hbs';
import Modal from './modal-card';
import { movieLibrary } from '../components/movie-library';
import { apiService } from '../services/api';
import { getMovieCardTrailer } from '../components/modal-trailer';
import { doLocalization } from '../components/language-switcher';

export const modalMovieCard = new Modal({
  rootSelector: '.content',
  body: 'body',
  html: 'html',
  activeModalClass: 'backdrop--hidden',
  removeScrollClass: 'body--hidden',
  landscapeHidden: 'body_landscape--hidden',
  landscapeVisible: 'is-landscape',
  modalClass: '#modal',
  storage: getMovies,
});

function getMovies() {
  apiService.MovieSearchId(modalMovieCard._imgId).then(result => {
    const genres = result.genres.map(item => item.name).slice(0, 2);
    result.genres = genres.join(', ');

    movieCardMarkup(result);
    modalMovieCard._getMovie(result);
    movieLibrary._getMovieForLibrary(result);

    const closeModalRef = document.querySelector('.close-modal');
    const queueRef = document.querySelector('.movie-btn--queue');
    const watchedRef = document.querySelector('.movie-btn--watched');

    const movieQueStorage = localStorage.getItem('queueStorage');
    const queueStorage = JSON.parse(movieQueStorage) || [];

    if (queueStorage !== null) {
      queueStorage.find(movie => {
        if (movie.id === this._imgId && apiService._lang === 'ru-RU') {
          queueRef.classList.add('movie-btn__btn--active');
          queueRef.textContent = 'удалить из Ожидаемых';
        } else if (movie.id === this._imgId && apiService._lang === 'en-US') {
          queueRef.classList.add('movie-btn__btn--active');
          queueRef.textContent = 'remove from queue';
        }
      });
    }

    const movieWatStorage = localStorage.getItem('watchedStorage');
    const watchedStorage = JSON.parse(movieWatStorage) || [];

    if (watchedStorage !== null) {
      watchedStorage.find(movie => {
        if (movie.id === this._imgId && apiService._lang === 'ru-RU') {
          watchedRef.classList.add('movie-btn__btn--active');
          watchedRef.textContent = 'удалить из Просмотренных';
        } else if (movie.id === this._imgId && apiService._lang === 'en-US') {
          watchedRef.classList.add('movie-btn__btn--active');
          watchedRef.textContent = 'remove from watched';
        }
      });
    }

    modalMovieCard._getRefEl(closeModalRef);
    movieLibrary._bindEvents(queueRef, watchedRef);
  });
}

function movieCardMarkup(movie) {
  const markup = movieCard(movie);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);
  getMovieCardTrailer();
  getRefs();
  doLocalization();
}
