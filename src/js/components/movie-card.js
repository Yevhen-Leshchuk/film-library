import refs from '../refs';
import pagination from '../components/pagination';
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

//--------------------Movie Library-----------

class Library {
  constructor() {
    this._refs = {};
    this._queueBtn = '';
    this._watchedBtn = '';
    this._queueStorage = '';
    this._isActive = false;
  }

  _bindEvents(queueRef, watchedRef) {
    const refs = {
      queueRef,
      watchedRef,
    };
    this._refs = refs;
    refs.queueRef.addEventListener('click', this._onButtonQueueClick.bind(this));
  }

  _onButtonQueueClick(event) {
    event.preventDefault();

    this._queueBtn = event.target;

    if (!this._isActive) {
      this._isActive = true;

      this._getMoviesFromLocalStorage();

      this._queueBtn.textContent = 'remove from queue';
      this._refs.queueRef.classList.add('movie-btn__btn--active');
      return;
    }

    if (this._isActive) {
      this._isActive = false;

      this._clearQueue();
      return;
    }
  }

  _showQueue() {
    const movieStorage = localStorage.getItem('queueStorage');
    this._queueStorage = JSON.parse(movieStorage) || [];
    setClassOnBtn();
    galleryMarkup(this._queueStorage);
  }

  _clearQueue() {
    const modalStorage = localStorage.getItem('inModalMovie');
    const inModalMovie = JSON.parse(modalStorage);
    const movieStorage = localStorage.getItem('queueStorage');
    this._queueStorage = JSON.parse(movieStorage) || [];

    if (!this._queueStorage || this._queueStorage.find(e => e.id === inModalMovie.id)) {
      this._queueStorage.pop(inModalMovie);

      localStorage.setItem('queueStorage', JSON.stringify(this._queueStorage));
    }

    this._queueBtn.textContent = 'add to queue';
    this._refs.queueRef.classList.remove('movie-btn__btn--active');
    clearGallery();
    pagination.reset(this._queueStorage.length);
  }

  _showWatched() {
    // queueBtnRef.classList.remove('header-control__btn--active');
    // watchedBtnRef.classList.add('header-control__btn--active');
  }

  _getMoviesFromLocalStorage() {
    const modalStorage = localStorage.getItem('inModalMovie');
    const inModalMovie = JSON.parse(modalStorage);
    const movieStorage = localStorage.getItem('queueStorage');
    this._queueStorage = JSON.parse(movieStorage) || [];

    this._addToQueue(this._queueStorage, inModalMovie);

    // if (!queueStorage.find(e => e.id === inModalMovie.id)) {
    //   this._queue = queueStorage;
    //   this._queue.push(inModalMovie);

    //   localStorage.setItem('queueStorage', JSON.stringify(this._queue));
    // }
  }

  _addToQueue(queueStorage, inModalMovie) {
    // console.log(queueStorage);
    if (!queueStorage.find(e => e.id === inModalMovie.id)) {
      queueStorage.push(inModalMovie);

      localStorage.setItem('queueStorage', JSON.stringify(queueStorage));
    }
  }
}

export const movieLibrary = new Library({});
