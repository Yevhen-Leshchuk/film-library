import refs from '../refs';
import { apiService } from '../services/api';
import { modalMovieCard } from '../components/movie-card';
import { galleryMarkup, clearGallery } from '../components/content';
import { setClassOnBtn } from '../components/header';
import { queue, watched } from '../components/library-pagination';
import { plugMarkup } from '../components/plug';
import { getClassWatchedBtn, getClassQueueBtn } from '../components/header';
import {
  showMessageStorageEmpty,
  showMessageStorageFuul,
  showMessageSameMovies,
} from '../components/notification';

//--------------------Movie Library-----------

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

  //----------- library storage------------------------

  _onBtnQueueClick(event) {
    event.preventDefault();
    this._queueBtn = event.target;

    if (localStorage.getItem('queueStorage') === null) {
      this._queueStorage = [];
    }

    if (localStorage.getItem('queueStorage') !== null) {
      this._queueStorage = JSON.parse(localStorage.getItem('queueStorage'));
      if (this._queueStorage.length === 19) {
        this._storagePage += 1;
      }
    }

    //----------- clearing storage------------------------

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
          } else {
            clearGallery();
            galleryMarkup(this._queueStorage.slice(20));
          }
        }
      }
      if (apiService._lang === 'ru-RU') {
        this._refs.queueRef.classList.remove('movie-btn__btn--active');
        this._refs.queueRef.textContent = 'смотреть Позже';
      } else {
        this._refs.queueRef.classList.remove('movie-btn__btn--active');
        this._refs.queueRef.textContent = 'add to queue';
      }

      // this._refs.queueRef.classList.remove('movie-btn__btn--active');
      // this._refs.queueRef.textContent = 'add to queue';

      if (this._queueStorage.length === 0) {
        showMessageStorageEmpty();
        plugMarkup();

        refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
      }

      localStorage.setItem('queueStorage', JSON.stringify(this._queueStorage));

      if (this._queueStorage.length === 20) {
        queue.reset(this._queueStorage.length);
      }
      return;
    }

    //------------------------------------------------------------

    if (this._queueStorage.length === 40) {
      showMessageStorageFuul();
      return;
    }

    this._getWatchedMovieId();
    this._getQueueMovieId();

    if (this._getWatchedMovieId().find(id => id === modalMovieCard._imgId)) {
      showMessageSameMovies();
      return;
    }

    this._queueStorage.push(this._newMovie);
    localStorage.setItem('queueStorage', JSON.stringify(this._queueStorage));

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
    } else {
      this._refs.queueRef.classList.add('movie-btn__btn--active');
      this._refs.queueRef.textContent = 'remove from queue';
    }

    // this._refs.queueRef.classList.add('movie-btn__btn--active');
    // this._refs.queueRef.textContent = 'remove from queue';
  }

  //----------- Watched storage------------------------

  _onBtnWatchedClick(event) {
    event.preventDefault();
    this._watchedBtn = event.target;

    if (localStorage.getItem('watchedStorage') === null) {
      this._watchedStorage = [];
    }

    if (localStorage.getItem('watchedStorage') !== null) {
      this._watchedStorage = JSON.parse(localStorage.getItem('watchedStorage'));
      if (this._watchedStorage.length === 19) {
        this._storagePage += 1;
      }
    }

    //----------- clearing storage------------------------

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
          } else {
            clearGallery();
            galleryMarkup(this._watchedStorage.slice(20));
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

      // this._refs.watchedRef.classList.remove('movie-btn__btn--active');
      // this._refs.watchedRef.textContent = 'add to Watched';

      if (this._watchedStorage.length === 0) {
        showMessageStorageEmpty();
        plugMarkup();

        refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
      }

      localStorage.setItem('watchedStorage', JSON.stringify(this._watchedStorage));

      if (this._watchedStorage.length === 20) {
        watched.reset(this._watchedStorage.length);
      }
      return;
    }

    //------------------------------------------------------------

    if (this._watchedStorage.length === 40) {
      showMessageStorageFuul();
      return;
    }

    this._getQueueMovieId();
    this._getWatchedMovieId();

    if (this._getQueueMovieId().find(id => id === modalMovieCard._imgId)) {
      showMessageSameMovies();
      return;
    }

    this._watchedStorage.push(this._newMovie);
    localStorage.setItem('watchedStorage', JSON.stringify(this._watchedStorage));

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
    } else {
      this._refs.watchedRef.classList.add('movie-btn__btn--active');
      this._refs.watchedRef.textContent = 'remove from watched';
    }

    // this._refs.watchedRef.classList.add('movie-btn__btn--active');
    // this._refs.watchedRef.textContent = 'remove from watched';
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
