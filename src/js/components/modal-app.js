export default class Modal {
  constructor({ rootSelector, body, activeModalClass, removeScrollClass, storage, modalClass }) {
    this._refs = this._getRefs(rootSelector, body, modalClass);
    this._modalBtnRef = {};
    this._imgId = '';
    this._activeModalClass = activeModalClass;
    this._removeScrollClass = removeScrollClass;
    this._storage = storage;
    this._modalClass = modalClass;

    this._bindEvents();
  }

  _getRefs(rootSelector, body, modalClass) {
    const refs = {};

    refs.eventTargetRef = document.querySelector(`${rootSelector}`);
    refs.bodyRef = document.querySelector(`${body}`);
    refs.modalRef = document.querySelector(`${modalClass}`);

    return refs;
  }

  _getRefEl(closeModalRef, queueRef, watchedRef) {
    closeModalRef.addEventListener('click', this._closeModal.bind(this));

    const refs = {
      queueRef,
      watchedRef,
    };
    this._modalBtnRef = refs;
  }

  _bindEvents() {
    this._refs.eventTargetRef.addEventListener('click', this._openModal.bind(this));
    this._refs.modalRef.addEventListener('click', this._onLightboxClick.bind(this));
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
    this._refs.bodyRef.classList.add(this._removeScrollClass);
    window.addEventListener('keydown', this._onKeyPress.bind(this));

    localStorage.setItem('inModalMovie', JSON.stringify(this._newMovie));

    const localStorageMovies = localStorage.getItem('queueStorage');
    const queueStorage = JSON.parse(localStorageMovies);
    queueStorage.find(movie => {
      if (movie.id === this._imgId) {
        this._modalBtnRef.queueRef.classList.add('movie-btn__btn--active');
        this._modalBtnRef.queueRef.textContent = 'remove from queue';
      }
    });
  }

  _closeModal() {
    this._refs.modalRef.classList.add(this._activeModalClass);
    this._refs.bodyRef.classList.remove(this._removeScrollClass);

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
