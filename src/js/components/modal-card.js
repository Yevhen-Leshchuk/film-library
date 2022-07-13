export default class Modal {
  constructor({
    rootSelector,
    body,
    activeModalClass,
    removeScrollClass,
    storage,
    modalClass,
    landscapeHidden,
    html,
    landscapeVisible,
  }) {
    this._refs = this._getRefs(rootSelector, body, modalClass, html);
    this._imgId = [];
    this._activeModalClass = activeModalClass;
    this._removeScrollClass = removeScrollClass;
    this._storage = storage;
    this._modalClass = modalClass;
    this.landscapeHidden = landscapeHidden;
    this._landscapeVisible = landscapeVisible;

    this._bindEvents();
  }

  _getRefs(rootSelector, body, modalClass, html) {
    const refs = {};

    refs.eventTargetRef = document.querySelector(`${rootSelector}`);
    refs.bodyRef = document.querySelector(`${body}`);
    refs.modalRef = document.querySelector(`${modalClass}`);
    refs.htmlRef = document.querySelector(`${html}`);

    return refs;
  }

  _getRefEl(closeModalRef) {
    closeModalRef.addEventListener('click', this._closeModal.bind(this));
  }

  _bindEvents() {
    this._refs.eventTargetRef.addEventListener('click', this._openModal.bind(this));
    this._refs.modalRef.addEventListener('click', this._onLightboxClick.bind(this));
  }

  _getMovieFromQueueStorage() {
    const movieQueueStorage = localStorage.getItem('queueStorage');
    const queueStorage = JSON.parse(movieQueueStorage);

    return queueStorage;
  }

  _getMovieFromWatchedStorage() {
    const movieWatchedStorage = localStorage.getItem('watchedStorage');
    const watchedStorage = JSON.parse(movieWatchedStorage);

    return watchedStorage;
  }

  _openModal(event) {
    event.preventDefault();
    const imgRef = event.target;
    this._imgId = imgRef.dataset.id;
    this._imgId = Number(this._imgId);

    if (imgRef.nodeName !== 'IMG') {
      return;
    }

    this._storage();

    this._refs.modalRef.classList.remove(this._activeModalClass);
    this._refs.bodyRef.classList.add(this._removeScrollClass, this.landscapeHidden);
    this._refs.htmlRef.classList.add(this._landscapeVisible);

    window.addEventListener('keydown', this._onKeyPress.bind(this));
  }

  _getIdForQueueStorage() {
    if (this._getMovieFromQueueStorage() !== null) {
      const arrQueue = this._getMovieFromQueueStorage().map(movie => movie.id);
      return arrQueue.includes(this._imgId);
    } else return false;
  }

  _getIdForWatchedStorage() {
    if (this._getMovieFromWatchedStorage() !== null) {
      const arrWatched = this._getMovieFromWatchedStorage().map(movie => movie.id);
      return arrWatched.includes(this._imgId);
    } else return false;
  }

  _closeModal() {
    this._refs.modalRef.classList.add(this._activeModalClass);
    this._refs.bodyRef.classList.remove(this._removeScrollClass, this.landscapeHidden);
    this._refs.htmlRef.classList.remove(this._landscapeVisible);

    this._refs.modalRef.innerHTML = '';

    window.removeEventListener('keydown', this._onKeyPress.bind(this));
  }

  _onLightboxClick(event) {
    if (event.target === event.currentTarget) this._closeModal();
  }

  _onKeyPress(event) {
    if (event.code === 'Escape') this._closeModal();
  }

  _getMovie(newMovie) {
    this._newMovie = newMovie;
  }
}
