import footer from '../../templates/footer.hbs';
import footerModal from '../../templates/footer-modal.hbs';
import icon from '../../images/sprite/sprite.svg';
import refs from '../refs';

function footerMarkup() {
  const markup = footer(icon);
  refs.footerContainerRef.insertAdjacentHTML('beforeend', markup);
}

footerMarkup();

const footerModalRef = document.querySelector('.footer-developer__link');

footerModalRef.addEventListener('click', onFooterModal);
refs.modalRef.addEventListener('click', onLightboxClick);

function onFooterModal(event) {
  event.preventDefault();
  developerCardMarkup();

  const closeModalBtnRef = document.querySelector('#footer-modal');
  closeModalBtnRef.addEventListener('click', closeModal);

  refs.modalRef.classList.remove('backdrop--hidden');
  refs.bodyRef.classList.add('body--hidden');
  window.addEventListener('keydown', onKeyPress);
}

function closeModal() {
  refs.modalRef.classList.add('backdrop--hidden');
  refs.bodyRef.classList.remove('body--hidden');

  refs.modalRef.innerHTML = '';

  window.removeEventListener('keydown', onKeyPress);
}

function onLightboxClick(event) {
  if (event.target === event.currentTarget) closeModal();
}

function onKeyPress(event) {
  if (event.code === 'Escape') closeModal();
}

function developerCardMarkup() {
  const markup = footerModal(icon);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);
}
