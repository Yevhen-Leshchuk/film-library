import refs from '../refs';
import movieCard from '../../templates/movie-card.hbs';
import Modal from '../components/modal-app';
import { movieStorage, galleryMarkup, clearGallery } from '../components/content';
import { setClassOnBtn } from '../components/header';

const modalMovieCard = new Modal({
  rootSelector: '.content',
  body: 'body',
  activeModalClass: 'backdrop--hidden',
  removeScrollClass: 'body--hidden',
  modalClass: '#modal',
  storage: getMovies,
});

function getMovies() {
  // console.log(movieStorage.storage);

  movieStorage.storage.find(result => {
    if (result.id === modalMovieCard._imgId) {
      // console.log(result);
      movieCardMarkup(result);
      modalMovieCard._getMovie(result);

      const closeModalRef = document.querySelector('.close-modal');
      const queueRef = document.querySelector('.movie-btn--queue');
      const watchedRef = document.querySelector('.movie-btn--watched');

      modalMovieCard._getRefEl(closeModalRef, queueRef, watchedRef);
      movieLibrary._bindEvents(queueRef, watchedRef);
    }
  });
}

function movieCardMarkup(movie) {
  const markup = movieCard(movie);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);
}

class Library {
  constructor() {
    this._refs = {};
    this._textContent = '';
  }

  _bindEvents(queueRef, watchedRef) {
    const refs = {
      queueRef,
      watchedRef,
    };
    this._refs = refs;
    refs.queueRef.addEventListener('click', this._onButtonQueueClick.bind(this));
    refs.queueRef.addEventListener('click', this._clearQueue.bind(this));
  }

  _onButtonQueueClick(event) {
    event.preventDefault();

    this._getMoviesFromLocalStorage();

    this._textContent = event.target;

    this._textContent.textContent = 'remove from queue';
    this._refs.queueRef.classList.add('movie-btn__btn--active');
  }

  _showQueue() {
    const movieStorage = localStorage.getItem('queueStorage');
    let queueStorage = JSON.parse(movieStorage) || [];
    setClassOnBtn();
    galleryMarkup(queueStorage);
  }

  _clearQueue() {}

  _showWatched() {
    // queueBtnRef.classList.remove('header-control__btn--active');
    // watchedBtnRef.classList.add('header-control__btn--active');
  }

  _getMoviesFromLocalStorage() {
    const modalStorage = localStorage.getItem('inModalMovie');
    const inModalMovie = JSON.parse(modalStorage);
    const movieStorage = localStorage.getItem('queueStorage');
    let queueStorage = JSON.parse(movieStorage) || [];

    if (!queueStorage.find(e => e.id === inModalMovie.id)) {
      this._queue = queueStorage;
      this._queue.push(inModalMovie);

      localStorage.setItem('queueStorage', JSON.stringify(this._queue));
    }
  }
}

export const movieLibrary = new Library({});
