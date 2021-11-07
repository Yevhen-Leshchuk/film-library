import headerHome from '../../templates/header-home.hbs';
import logo from '../../images/sprite/sprite.svg';
import refs from '../refs';

// loading header home -----------------------

headerHomeMarkup();

function headerHomeMarkup() {
  const markup = headerHome(logo);

  refs.containerHederRefs.insertAdjacentHTML('beforeend', markup);
}

// logic of header home and library pages------------------

const headerNavRefs = document.querySelector('.header-nav');
const headerFormRefs = document.querySelector('.header-form');
const headerControlRefs = document.querySelector('.header-control');
const headerRefs = document.querySelector('.header');
const headerBtnHomeRefs = document.querySelector('.header-home-btn');
const headerBtnLibrRefs = document.querySelector('.header-library-btn');
const logoRefs = document.querySelector('.header-logo');

headerNavRefs.addEventListener('click', onControlClick);
logoRefs.addEventListener('click', onLogoClick);

function onControlClick(event) {
  event.preventDefault();

  const controlItem = event.target;
  controlItem.getAttribute('button[data-action"]');
  const getElement = controlItem;

  openHeaderHome(getElement);
  openHeaderLibrary(getElement);
}

function onLogoClick(event) {
  event.preventDefault();

  const logo = event.currentTarget;

  openHeaderHome(logo);
}

function openHeaderHome(element) {
  if (element.dataset.action === 'home') {
    headerFormRefs.classList.remove('header-form--hidden');
    headerControlRefs.classList.remove('header-control--active');
    headerBtnLibrRefs.classList.remove('header-button--active');
    headerRefs.classList.remove('header-library');
    headerRefs.classList.add('header-home');
    headerBtnHomeRefs.classList.add('header-button--active');
  }
}

function openHeaderLibrary(element) {
  if (element.dataset.action === 'library') {
    headerFormRefs.classList.add('header-form--hidden');
    headerControlRefs.classList.add('header-control--active');
    headerBtnLibrRefs.classList.add('header-button--active');
    headerRefs.classList.add('header-library');
    headerRefs.classList.remove('header-home');
    headerBtnHomeRefs.classList.remove('header-button--active');
  }
}
