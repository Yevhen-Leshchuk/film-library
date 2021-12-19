import forms from '../../templates/forms.hbs';
import refs from '../refs';
import icons from '../../images/sprite/sprite.svg';
import { getForms } from '../components/forms';
import { getSubmittedData } from '../components/user-auth';

refs.modalRef.addEventListener('click', onLightboxClick);

export function onAccountClick(event) {
  event.preventDefault();
  formCardMarkup();
  const closeModalBtnRef = document.querySelector('#form-modal');
  closeModalBtnRef.addEventListener('click', closeModal);

  refs.modalRef.classList.remove('backdrop--hidden');
  refs.bodyRef.classList.add('body--hidden', 'body_landscape--hidden');
  refs.htmlRef.classList.add('is-landscape');

  window.addEventListener('keydown', onKeyPress);
}

export function closeModal() {
  refs.modalRef.classList.add('backdrop--hidden');
  refs.bodyRef.classList.remove('body--hidden', 'body_landscape--hidden');
  refs.htmlRef.classList.remove('is-landscape');

  refs.modalRef.innerHTML = '';

  window.removeEventListener('keydown', onKeyPress);
}

function onLightboxClick(event) {
  if (event.target === event.currentTarget) closeModal();
}

function onKeyPress(event) {
  if (event.code === 'Escape') closeModal();
}

function formCardMarkup() {
  const markup = forms(icons);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);
  getForms();
}
