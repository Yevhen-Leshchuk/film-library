import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { apiService } from '../services/api';
import { galleryMarkup, clearGallery } from '../components/content';
import { backToTop } from '../components/scroll-up';

const container = document.getElementById('tui-pagination-container');

const pagination = new Pagination(container, {
  itemsPerPage: 20,
  visiblePages: 5,
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

pagination.on('beforeMove', async e => {
  backToTop();
  apiService.page = e.page;

  const movies = await apiService.fetchMovies();

  clearGallery();
  galleryMarkup(movies.results);
});

let totalItemsFromServer;
const init = async total => {
  totalItemsFromServer = await apiService.fetchMovies();

  if (total === undefined) total = totalItemsFromServer.total_results;

  pagination.setTotalItems(total);
  pagination.reset();
};

init();

export default {
  reset: init,
};
