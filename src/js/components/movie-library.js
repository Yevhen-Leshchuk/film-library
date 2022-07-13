import refs from '../refs.js';
import { apiService } from '../services/api.js';
import { modalMovieCard } from './movie-card.js';
import { galleryMarkup, clearGallery } from './content.js';
import { setClassOnBtn } from './header.js';
import { queue, watched } from './library-pagination.js';
import { plugMarkup } from './plug.js';
import { showMessageNoAuth } from './notification.js';
import { getClassWatchedBtn, getClassQueueBtn } from './header.js';
import { setToLibrary, deleteMovieFromLibrary } from './api-movie-library.js';
import {
  showMessageStorageEmpty,
  showMessageStorageFuul,
  showMessageSameMovies,
} from './notification.js';

/**
 * movie library
 **/
class Library {
  constructor() {
    this._storagePage = 1;
    this._refs = {};
    this._queueBtn = '';
    this._watchedBtn = '';
    this._queueStorage = [];
    this._watchedStorage = [];
    this._isActive = false;
    this._id = null;
    this._queueId = [];
    this._watchedId = [];
    this._deletedQueueMovie = false;
    this._deletedWatchedMovie = false;
  }

  _bindEvents(queueRef, watchedRef) {
    const refs = {
      queueRef,
      watchedRef,
    };
    this._refs = refs;
    refs.queueRef.addEventListener('click', this._onBtnQueueClick.bind(this));
    refs.watchedRef.addEventListener('click', this._onBtnWatchedClick.bind(this));
  }

  _getHeaderHomeBtn(homeBtn) {
    this.refBtn = homeBtn;
  }

  /**
   * library storage
   **/
  _onBtnQueueClick(event) {
    event.preventDefault();
    this._queueBtn = event.target;
    const status = event.target.dataset.status;

    if (localStorage.getItem('queueStorage') === null) {
      this._queueStorage = [];
    }

    if (localStorage.getItem('queueStorage') !== null) {
      this._queueStorage = JSON.parse(localStorage.getItem('queueStorage'));

      this.numberOfMovies = this._queueStorage.length;
      this._storagePage = Math.ceil(this.numberOfMovies / 20);
    }

    /**
     * clearing storage
     **/
    const userStorageQueue = localStorage.getItem('user');
    let userDataQueue = JSON.parse(userStorageQueue);

    if (
      this._refs.queueRef.textContent === 'удалить из Ожидаемых' ||
      this._refs.queueRef.textContent === 'remove from queue'
    ) {
      if (userDataQueue.films) {
        const movieId = userDataQueue.films.find((movie, index) => {
          if (modalMovieCard._imgId === movie.apiFilmId) {
            userDataQueue.films.splice(index, 1);
            localStorage.setItem('user', JSON.stringify(userDataQueue));

            return movie._id;
          }
        });
        deleteMovieFromLibrary(userDataQueue.token, status, movieId._id);
      }
    }

    /**
     * add film to queue storage
     **/
    if (
      this._queueStorage.length === 200 &&
      this._refs.queueRef.textContent !== 'удалить из Ожидаемых' &&
      this._refs.queueRef.textContent !== 'remove from queue'
    ) {
      showMessageStorageFuul();
      return;
    }

    this._getWatchedMovieId();
    this._getQueueMovieId();

    if (this._getWatchedMovieId().find(id => id === modalMovieCard._imgId)) {
      showMessageSameMovies();
      return;
    }
    if (
      this._refs.queueRef.textContent === 'смотреть Позже' ||
      this._refs.queueRef.textContent === 'add to queue'
    ) {
      if (!userDataQueue) {
        showMessageNoAuth();
        return;
      }
      setToLibrary(this._newMovie.id, userDataQueue.token, status, this._newMovie);
    }

    if (this._storagePage === 1 || this._queueStorage) {
      if (getClassQueueBtn()) {
        clearGallery();
        galleryMarkup(this._queueStorage.slice(0, 20));
      }
    }
    if (this._storagePage === 2 && getClassQueueBtn()) {
      clearGallery();
      galleryMarkup(this._queueStorage.slice(20));
    }

    if (apiService._lang === 'ru-RU') {
      this._refs.queueRef.classList.add('movie-btn__btn--active');
      this._refs.queueRef.textContent = 'удалить из Ожидаемых';
    } else if (apiService._lang === 'en-US') {
      this._refs.queueRef.classList.add('movie-btn__btn--active');
      this._refs.queueRef.textContent = 'remove from queue';
    }
  }

  _clearQueueStorage() {
    if (this._deletedQueueMovie) {
      if (modalMovieCard._getIdForQueueStorage(modalMovieCard._imgId)) {
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
            if (this._storagePage === 1) {
              clearGallery();
              galleryMarkup(this._queueStorage.slice(0, 20));
            } else if (this._storagePage > 1) {
              this.beginIndex = this._storagePage * 20 - 20;
              this.endIndex = this._storagePage * 20;

              clearGallery();
              galleryMarkup(this._queueStorage.slice(this.beginIndex, this.endIndex));
            }
          }
        }

        if (apiService._lang === 'ru-RU') {
          this._refs.queueRef.classList.remove('movie-btn__btn--active');
          this._refs.queueRef.textContent = 'смотреть Позже';
        } else if (apiService._lang === 'en-US') {
          this._refs.queueRef.classList.remove('movie-btn__btn--active');
          this._refs.queueRef.textContent = 'add to queue';
        }

        if (this._queueStorage.length === 0) {
          showMessageStorageEmpty();

          if (this._headerHomePage !== 'is-active') {
            plugMarkup();
            const plugTextRef = document.querySelector('.plug-box__text');
            if (apiService._lang === 'ru-RU') {
              plugTextRef.textContent = 'Библиотека "посмотреть фильмы" пуста!';
            } else if (apiService._lang === 'en-US') {
              plugTextRef.textContent = '"Queue" storage is empty!';
            }
          }

          refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
        }

        localStorage.setItem('queueStorage', JSON.stringify(this._queueStorage));

        if (this._queueStorage.length === 20) {
          queue.reset(this._queueStorage.length);
        }
        return;
      }
    }
  }

  /**
   * watched storage
   **/
  _onBtnWatchedClick(event) {
    event.preventDefault();
    this._watchedBtn = event.target;
    const status = event.target.dataset.status;

    if (localStorage.getItem('watchedStorage') === null) {
      this._watchedStorage = [];
    }

    if (localStorage.getItem('watchedStorage') !== null) {
      this._watchedStorage = JSON.parse(localStorage.getItem('watchedStorage'));

      this.numberOfMovies = this._watchedStorage.length;
      this._storagePage = Math.ceil(this.numberOfMovies / 20);
    }

    /**
     * clearing storage
     **/
    const userStorageWatched = localStorage.getItem('user');
    let userDataWatched = JSON.parse(userStorageWatched);

    if (
      this._refs.watchedRef.textContent === 'удалить из Просмотренных' ||
      this._refs.watchedRef.textContent === 'remove from watched'
    ) {
      if (userDataWatched.films) {
        const movieId = userDataWatched.films.find((movie, index) => {
          if (modalMovieCard._imgId === movie.apiFilmId) {
            userDataWatched.films.splice(index, 1);

            localStorage.setItem('user', JSON.stringify(userDataWatched));

            return movie._id;
          }
        });
        deleteMovieFromLibrary(userDataWatched.token, status, movieId._id);
      }
    }

    /**
     * add to watched Storage
     **/
    if (
      this._watchedStorage.length === 200 &&
      this._refs.watchedRef.textContent !== 'удалить из Просмотренных' &&
      this._refs.watchedRef.textContent !== 'remove from watched'
    ) {
      showMessageStorageFuul();
      return;
    }

    this._getQueueMovieId();
    this._getWatchedMovieId();

    if (this._getQueueMovieId().find(id => id === modalMovieCard._imgId)) {
      showMessageSameMovies();
      return;
    }

    if (
      this._refs.watchedRef.textContent === 'добавить в Просмотренные' ||
      this._refs.watchedRef.textContent === 'add to Watched'
    ) {
      if (!userDataWatched) {
        showMessageNoAuth();
        return;
      }
      setToLibrary(this._newMovie.id, userDataWatched.token, status, this._newMovie);
    }

    if (this._storagePage === 1 || this._watchedStorage) {
      if (getClassWatchedBtn()) {
        clearGallery();
        galleryMarkup(this._watchedStorage.slice(0, 20));
      }
    }
    if (this._storagePage === 2 && getClassWatchedBtn()) {
      clearGallery();
      galleryMarkup(this._watchedStorage.slice(20));
    }

    if (apiService._lang === 'ru-RU') {
      this._refs.watchedRef.classList.add('movie-btn__btn--active');
      this._refs.watchedRef.textContent = 'удалить из Просмотренных';
    } else if (apiService._lang === 'en-US') {
      this._refs.watchedRef.classList.add('movie-btn__btn--active');
      this._refs.watchedRef.textContent = 'remove from watched';
    }
  }

  _clearWatchedStorage() {
    if (this._deletedWatchedMovie) {
      if (modalMovieCard._getIdForWatchedStorage(modalMovieCard._imgId)) {
        let indexMovie = this._watchedStorage.findIndex(element => {
          return element.id === modalMovieCard._imgId;
        });

        this._watchedStorage.splice(indexMovie, 1);

        if (this._watchedStorage.length <= 20) {
          if (!this.refBtn.classList.contains('header-button--active')) {
            clearGallery();
            galleryMarkup(this._watchedStorage);
          }
        } else if (this._watchedStorage.length > 20) {
          if (!this.refBtn.classList.contains('header-button--active')) {
            if (this._storagePage === 1) {
              clearGallery();
              galleryMarkup(this._watchedStorage.slice(0, 20));
            } else if (this._storagePage > 1) {
              this.beginIndex = this._storagePage * 20 - 20;
              this.endIndex = this._storagePage * 20;
              clearGallery();
              galleryMarkup(this._watchedStorage.slice(this.beginIndex, this.endIndex));
            }
          }
        }

        if (apiService._lang === 'ru-RU') {
          this._refs.watchedRef.classList.remove('movie-btn__btn--active');
          this._refs.watchedRef.textContent = 'добавить в Просмотренные';
        } else {
          this._refs.watchedRef.classList.remove('movie-btn__btn--active');
          this._refs.watchedRef.textContent = 'add to Watched';
        }

        if (this._watchedStorage.length === 0) {
          showMessageStorageEmpty();

          if (this._headerHomePage !== 'is-active') {
            plugMarkup();
            const plugTextRef = document.querySelector('.plug-box__text');
            if (apiService._lang === 'ru-RU') {
              plugTextRef.textContent = 'Библиотека "просмотренные фильмы" пуста!';
            } else if (apiService._lang === 'en-US') {
              plugTextRef.textContent = '"Watched" storage is empty!';
            }
          }

          refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
        }

        localStorage.setItem('watchedStorage', JSON.stringify(this._watchedStorage));

        if (this._watchedStorage.length === 20) {
          watched.reset(this._watchedStorage.length);
        }
        return;
      }
    }
  }

  _showQueue() {
    const movieQueStorage = localStorage.getItem('queueStorage');
    this._queueStorage = JSON.parse(movieQueStorage) || [];

    if (this._storagePage === 1 || this._queueStorage) {
      galleryMarkup(this._queueStorage.slice(0, 20));
    }

    setClassOnBtn();
    queue.reset(this._queueStorage.length);
  }

  _showWatched() {
    const movieWatStorage = localStorage.getItem('watchedStorage');
    this._watchedStorage = JSON.parse(movieWatStorage) || [];

    if (this._storagePage === 1 || this._watchedStorage) {
      galleryMarkup(this._watchedStorage.slice(0, 20));
    }

    watched.reset(this._watchedStorage.length);
  }

  _getMovieForLibrary(newMovie) {
    this._newMovie = newMovie;
  }

  _getQueueMovieId() {
    const movieQueStorage = localStorage.getItem('queueStorage');
    const queueStorage = JSON.parse(movieQueStorage) || [];

    this._queueId = queueStorage.map(movie => movie.id);
    return this._queueId;
  }

  _getWatchedMovieId() {
    const movieWatStorage = localStorage.getItem('watchedStorage');
    const watchedStorage = JSON.parse(movieWatStorage) || [];
    this._watchedId = watchedStorage.map(movie => movie.id);
    return this._watchedId;
  }
}

export const movieLibrary = new Library();
