import Pagination from '../../../_snowpack/pkg/tui-pagination.js';
import '../../../_snowpack/pkg/tui-pagination/dist/tui-pagination.css.proxy.js';
import { galleryMarkup, clearGallery } from './content.js';
import { movieLibrary } from './movie-library.js';
import { getClassWatchedBtn } from './header.js';
import { backToTop } from './scroll-up.js';

/**
 * library pagination
 **/
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
  let beginIndex;
  let endIndex;

  if (movieLibrary._storagePage === 1) {
    if (!getClassWatchedBtn()) {
      clearGallery();
      galleryMarkup(queueStorage.slice(0, 20));
    } else {
      clearGallery();
      galleryMarkup(watchedStorage.slice(0, 20));
    }
  } else if (movieLibrary._storagePage === e.page) {
    if (!getClassWatchedBtn()) {
      beginIndex = e.page * 20 - 20;
      endIndex = e.page * 20;

      clearGallery();
      galleryMarkup(queueStorage.slice(beginIndex, endIndex));
    } else {
      beginIndex = e.page * 20 - 20;
      endIndex = e.page * 20;
      clearGallery();
      galleryMarkup(watchedStorage.slice(beginIndex, endIndex));
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
