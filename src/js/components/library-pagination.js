import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { galleryMarkup, clearGallery } from '../components/content';
import { movieLibrary } from '../components/movie-library';
import { getClassWatchedBtn } from '../components/header';
import { backToTop } from '../components/scroll-up';

//-----------library pagination-------------

const libraryСontainer = document.getElementById('pagination-container');

const libraryPagination = new Pagination(libraryСontainer, {
  itemsPerPage: 20,
  visiblePages: 2,
  page: 1,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});

libraryPagination.on('beforeMove', e => {
  backToTop();

  movieLibrary._storagePage = e.page;

  const movieQueStorage = localStorage.getItem('queueStorage');
  const queueStorage = JSON.parse(movieQueStorage) || [];

  const movieWatStorage = localStorage.getItem('watchedStorage');
  const watchedStorage = JSON.parse(movieWatStorage) || [];

  if (movieLibrary._storagePage === 1) {
    if (!getClassWatchedBtn()) {
      clearGallery();
      galleryMarkup(queueStorage.slice(0, 20));
    } else {
      clearGallery();
      galleryMarkup(watchedStorage.slice(0, 20));
    }
  }

  if (movieLibrary._storagePage === 2) {
    if (!getClassWatchedBtn()) {
      clearGallery();
      galleryMarkup(queueStorage.slice(20));
    } else {
      clearGallery();
      galleryMarkup(watchedStorage.slice(20));
    }
  }
});

let totalItemsFromQueueStorage;

const initQueue = total => {
  const movieQueStorage = localStorage.getItem('queueStorage');
  const queueStorage = JSON.parse(movieQueStorage) || [];

  totalItemsFromQueueStorage = queueStorage;
  total = totalItemsFromQueueStorage.length;

  libraryPagination.setTotalItems(total);
  libraryPagination.reset();
};

initQueue();

export const queue = {
  reset: initQueue,
};

let totalItemsFromWatchedStorage;

const initWatched = total => {
  const movieWatStorage = localStorage.getItem('watchedStorage');
  const watchedStorage = JSON.parse(movieWatStorage) || [];

  totalItemsFromWatchedStorage = watchedStorage;

  total = totalItemsFromWatchedStorage.length;

  libraryPagination.setTotalItems(total);
  libraryPagination.reset();
};

initWatched();

export const watched = {
  reset: initWatched,
};
