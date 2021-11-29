import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { galleryMarkup, clearGallery, movieStorage } from '../components/content';
import { movieLibrary } from '../components/movie-card';

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
  movieLibrary._storagePage = e.page;

  const storage = localStorage.getItem('queueStorage');
  const queueStorage = JSON.parse(storage) || [];

  if (movieLibrary._storagePage === 1) {
    clearGallery();

    galleryMarkup(queueStorage.slice(0, 20));
  }

  if (movieLibrary._storagePage === 2) {
    clearGallery();
    movieStorage.storage = queueStorage.slice(20);

    galleryMarkup(movieStorage.storage);

    // if (queueStorage.length <= 20) movieLibrary._storagePage = 1;
  }
});

let totalItemsFromStorage;
const initItems = total => {
  const storage = localStorage.getItem('queueStorage');
  const queueStorage = JSON.parse(storage) || [];

  totalItemsFromStorage = queueStorage;

  total = totalItemsFromStorage.length;

  libraryPagination.setTotalItems(total);
  libraryPagination.reset();
};

initItems();

export default {
  reset: initItems,
};
