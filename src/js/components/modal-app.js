export default class Modal {
  constructor({
    rootSelector,
    body,
    activeModalClass,
    removeScrollClass,
    fetch,
    movieCardMarkup,
    modalClass,
  }) {
    this._refs = this._getRefs(rootSelector, body, modalClass);
    this._imgId = '';
    this._activeModalClass = activeModalClass;
    this._removeScrollClass = removeScrollClass;
    this._fetch = fetch;
    this._movieCardMarkup = movieCardMarkup;
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

    this._fetch();
    this._refs.modalRef.classList.remove(this._activeModalClass);
    this._refs.bodyRef.classList.add(this._removeScrollClass);

    window.addEventListener('keydown', this._onKeyPress.bind(this));
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

  _getElementById(results) {
    console.log(results);

    results.map(result => {
      if (result.id === this._imgId) {
        this._movieCardMarkup(result);
      }
    });

    const closeModalRef = document.querySelector('.close-modal');
    console.log(closeModalRef);

    closeModalRef.addEventListener('click', this._closeModal.bind(this));
  }
}
