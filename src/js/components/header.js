import headerHome from '../../templates/header-home.hbs';
import logo from '../../images/sprite/sprite.svg';
import { apiService } from '../services/api';
import { clearGallery, startPage } from '../components/content';
import pagination from '../components/pagination';
import { movieLibrary } from '../components/movie-library';
import { onAccountClick } from '../components/modal-forms';
// import { switcherMarkup } from '../components/theme';
import refs from '../refs';

// loading header home -----------------------

headerHomeMarkup();

export const searchFormRef = document.querySelector('.header-form');

function headerHomeMarkup() {
  const markupHeader = headerHome(logo);

  refs.hederContainerRef.insertAdjacentHTML('beforeend', markupHeader);
  // switcherMarkup();
}

// logic of header home and library pages------------------
const refsFromHeader = {
  headerNavRef: document.querySelector('.header-nav'),
  headerFormRef: document.querySelector('.header-form'),
  headerControlRef: document.querySelector('.header-control'),
  headerRef: document.querySelector('.header'),
  headerBtnHomeRef: document.querySelector('.header-home-btn'),
  headerBtnLibrRef: document.querySelector('.header-library-btn'),
  logoRef: document.querySelector('.header-logo'),
  queueBtnRef: document.querySelector('.header-control__queue'),
  watchedBtnRef: document.querySelector('.header-control__watched'),
  accountRef: document.querySelector('.header-auth'),
  headerEntranceRef: document.querySelector('.header-entrance__icon'),
  // headerMainNavRef: document.querySelector('.header-main-nav'),
};
movieLibrary._getHeaderHomeBtn(refsFromHeader.headerBtnHomeRef);

refsFromHeader.headerNavRef.addEventListener('click', onControlClick);
refsFromHeader.logoRef.addEventListener('click', onLogoClick);
refsFromHeader.queueBtnRef.addEventListener('click', onQueueBtnClick);
refsFromHeader.watchedBtnRef.addEventListener('click', onWatchedBtnClick);
refsFromHeader.headerEntranceRef.addEventListener('click', onAccountClick);

function onControlClick(event) {
  event.preventDefault();

  const controlItem = event.target;
  controlItem.getAttribute('button[data-action]');
  const getElement = controlItem;

  openHeaderHome(getElement);
  openHeaderLibrary(getElement);
}

function onLogoClick(event) {
  event.preventDefault();

  const logo = event.currentTarget;

  openHeaderHome(logo);

  apiService.searchQuery = '';
  apiService.page = 1;
  pagination.reset();
}

function openHeaderHome(element) {
  if (element.dataset.action === 'home') {
    clearGallery();
    startPage();

    apiService.searchQuery = '';
    apiService.page = 1;
    pagination.reset();

    showHeaderHome();
  }
}

export function showHeaderHome() {
  refsFromHeader.queueBtnRef.classList.remove('header-control__btn--active');
  refsFromHeader.watchedBtnRef.classList.remove('header-control__btn--active');
  refsFromHeader.headerFormRef.classList.remove('header-form--hidden');
  refsFromHeader.headerControlRef.classList.remove('header-control--active');
  refsFromHeader.headerBtnLibrRef.classList.remove('header-button--active');
  refsFromHeader.headerRef.classList.remove('header-library');
  refsFromHeader.headerRef.classList.add('header-home');
  refsFromHeader.headerBtnHomeRef.classList.add('header-button--active');

  refs.paginationContainerRef.classList.remove('tui-pagination--hidden');
  refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
}

function openHeaderLibrary(element) {
  if (element.dataset.action === 'library') {
    clearGallery();
    movieLibrary._showQueue();

    refsFromHeader.headerFormRef.classList.add('header-form--hidden');
    refsFromHeader.headerControlRef.classList.add('header-control--active');
    refsFromHeader.headerBtnLibrRef.classList.add('header-button--active');
    refsFromHeader.headerRef.classList.add('header-library');
    refsFromHeader.headerRef.classList.remove('header-home');
    refsFromHeader.headerBtnHomeRef.classList.remove('header-button--active');

    if (movieLibrary._queueStorage.length !== 0) {
      refs.libraryPaginationContainerRef.classList.remove('tui-pagination--hidden');
    } else {
      refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
    }
    refs.paginationContainerRef.classList.add('tui-pagination--hidden');
  }
}

function onQueueBtnClick() {
  clearGallery();
  movieLibrary._showQueue();

  if (movieLibrary._queueStorage.length !== 0) {
    refs.libraryPaginationContainerRef.classList.remove('tui-pagination--hidden');
  } else {
    refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
  }
  refs.paginationContainerRef.classList.add('tui-pagination--hidden');
}

function onWatchedBtnClick() {
  clearGallery();
  movieLibrary._showWatched();

  refsFromHeader.queueBtnRef.classList.remove('header-control__btn--active');
  refsFromHeader.watchedBtnRef.classList.add('header-control__btn--active');

  if (movieLibrary._watchedStorage.length !== 0) {
    refs.libraryPaginationContainerRef.classList.remove('tui-pagination--hidden');
  } else {
    refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
  }
  refs.paginationContainerRef.classList.add('tui-pagination--hidden');
}

export function setClassOnBtn() {
  refsFromHeader.queueBtnRef.classList.add('header-control__btn--active');
  refsFromHeader.watchedBtnRef.classList.remove('header-control__btn--active');
}

export function getClassQueueBtn() {
  if (refsFromHeader.queueBtnRef.classList.contains('header-control__btn--active')) {
    return true;
  } else return false;
}

export function getClassWatchedBtn() {
  if (refsFromHeader.watchedBtnRef.classList.contains('header-control__btn--active')) {
    return true;
  } else return false;
}
