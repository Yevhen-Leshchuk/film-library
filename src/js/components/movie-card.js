import refs from '../refs';
import movieCard from '../../templates/movie-card.hbs';
import Modal from '../components/modal-app';
import { movieStorage, galleryMarkup, clearGallery } from '../components/content';
import { setClassOnBtn } from '../components/header';
import lbPagination from '../components/library-pagination';

const modalMovieCard = new Modal({
  rootSelector: '.content',
  body: 'body',
  activeModalClass: 'backdrop--hidden',
  removeScrollClass: 'body--hidden',
  modalClass: '#modal',
  storage: getMovies,
});

function getMovies() {
  console.log(movieStorage.storage);

  movieStorage.storage.find(result => {
    // console.log(result.id);
    // console.log(modalMovieCard._imgId);

    if (result.id === modalMovieCard._imgId) {
      console.log(result.id);
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
    this._storagePage = 1;
    this._refs = {};
    this._queueBtn = '';
    this._watchedBtn = '';
    this._queueStorage = [];
    this._isActive = false;
    this._id = null;
  }

  _bindEvents(queueRef, watchedRef) {
    const refs = {
      queueRef,
      watchedRef,
    };
    this._refs = refs;
    refs.queueRef.addEventListener('click', this._onBtnQueueClick.bind(this));
  }

  _getHeaderHomeBtn(homeBtn) {
    this.refBtn = homeBtn;
  }

  _onBtnQueueClick(event) {
    event.preventDefault();
    this._queueBtn = event.target;

    if (modalMovieCard._getId(modalMovieCard._imgId)) {
      let indexMovie = this._queueStorage.findIndex(element => {
        return element.id === modalMovieCard._imgId;
      });

      this._queueStorage.splice(indexMovie, 1);

      if (this._queueStorage.length <= 20) {
        if (!this.refBtn.classList.contains('header-button--active')) {
          clearGallery();
          galleryMarkup(this._queueStorage);
        }
      } else if (this._queueStorage.length > 20) {
        if (!this.refBtn.classList.contains('header-button--active')) {
          clearGallery();
          galleryMarkup(this._queueStorage.slice(20));
        }
      }

      if (this._queueStorage.length === 0) {
        refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
      }

      localStorage.setItem('queueStorage', JSON.stringify(this._queueStorage));
      this._refs.queueRef.classList.remove('movie-btn__btn--active');
      this._refs.queueRef.textContent = 'add to queue';

      if (this._queueStorage.length === 20) {
        lbPagination.reset(this._queueStorage.length);
      }
      return;
    }

    this._getMoviesFromLocalStorage();

    this._refs.queueRef.classList.add('movie-btn__btn--active');
    this._refs.queueRef.textContent = 'remove from queue';
  }

  _showQueue() {
    const movieStorage = localStorage.getItem('queueStorage');
    this._queueStorage = JSON.parse(movieStorage) || [];

    if (this._storagePage === 1 || this._queueStorage) {
      galleryMarkup(this._queueStorage.slice(0, 20));
    }

    setClassOnBtn();
    lbPagination.reset(this._queueStorage.length);
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

    if (this._queueStorage.length === 19) {
      this._storagePage += 1;
    }
    this._addToQueue(this._queueStorage, inModalMovie);
  }

  _addToQueue(queueStorage, inModalMovie) {
    if (!queueStorage.find(e => e.id === inModalMovie.id)) {
      if (queueStorage.length === 40) {
        alert('Хранилище фильмов заполнено! Пожалуйста очистите хранилище.');
        return;
      }
      queueStorage.push(inModalMovie);

      localStorage.setItem('queueStorage', JSON.stringify(queueStorage));
    }
  }
}

export const movieLibrary = new Library();
