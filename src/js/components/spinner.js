import spinner from '../../templates/spinner.hbs';
import refs from '../refs';

export default class Spinner {
  constructor() {
    this.spinner = document.querySelector('.spinner');
  }
  hideSpinner() {
    this.spinner.classList.add('visually-hidden');
    refs.loaderRef.classList.add('loader-box--hidden');
  }
  showSpinner() {
    this.spinner.classList.remove('visually-hidden');
    refs.loaderRef.classList.remove('loader-box--hidden');
  }
}
export function spinnerMarkup() {
  const markup = spinner();
  refs.loaderRef.insertAdjacentHTML('afterbegin', markup);
}
spinnerMarkup();
