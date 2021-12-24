import spinner from '../../templates/spinner.hbs';
import refs from '../refs';

const loader = document.querySelector('.loader-box');

export default class Spinner {
  constructor() {
    this.spinner = document.querySelector('.spinner');
  }
  hideSpinner() {
    this.spinner.classList.add('visually-hidden');
    loader.classList.add('loader-box--hidden');
  }
  showSpinner() {
    this.spinner.classList.remove('visually-hidden');
    loader.classList.remove('loader-box--hidden');
  }
}
export function spinnerMarkup() {
  const markup = spinner();
  loader.insertAdjacentHTML('afterbegin', markup);
}
spinnerMarkup();
