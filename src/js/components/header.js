import headerHome from '../../templates/header-home.hbs';
import logo from '../../images/sprite/sprite.svg';
import { apiService } from '../services/api';
import { fetchMovies, clearGallery } from '../components/content';
import pagination from '../components/pagination';
import refs from '../refs';

// loading header home -----------------------

headerHomeMarkup();

export const searchFormRef = document.querySelector('.header-form');

function headerHomeMarkup() {
  const markupHeader = headerHome(logo);

  refs.hederContainerRef.insertAdjacentHTML('beforeend', markupHeader);
}

// logic of header home and library pages------------------

const headerNavRef = document.querySelector('.header-nav');
const headerFormRef = document.querySelector('.header-form');
const headerControlRef = document.querySelector('.header-control');
const headerRef = document.querySelector('.header');
const headerBtnHomeRef = document.querySelector('.header-home-btn');
const headerBtnLibrRef = document.querySelector('.header-library-btn');
const logoRef = document.querySelector('.header-logo');

headerNavRef.addEventListener('click', onControlClick);
logoRef.addEventListener('click', onLogoClick);

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
  clearGallery();

  apiService.searchQuery = '';
  apiService.page = 1;
  fetchMovies();
  pagination.reset();
}

function openHeaderHome(element) {
  if (element.dataset.action === 'home') {
    headerFormRef.classList.remove('header-form--hidden');
    headerControlRef.classList.remove('header-control--active');
    headerBtnLibrRef.classList.remove('header-button--active');
    headerRef.classList.remove('header-library');
    headerRef.classList.add('header-home');
    headerBtnHomeRef.classList.add('header-button--active');
  }
}

function openHeaderLibrary(element) {
  if (element.dataset.action === 'library') {
    headerFormRef.classList.add('header-form--hidden');
    headerControlRef.classList.add('header-control--active');
    headerBtnLibrRef.classList.add('header-button--active');
    headerRef.classList.add('header-library');
    headerRef.classList.remove('header-home');
    headerBtnHomeRef.classList.remove('header-button--active');
  }
}
