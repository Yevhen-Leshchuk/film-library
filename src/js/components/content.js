import gallery from '../../templates/content.hbs.proxy.js';
import pagination from './pagination.js';
import refs from '../refs.js';
import { apiService } from '../services/api.js';
import { searchFormRef } from './header.js';
import { showMessageNoInput, showMessageInvalidRequest } from './notification.js';
import { plugMarkup } from './plug.js';
import Spinner from './spinner.js';

const spinner = new Spinner();

searchFormRef.addEventListener('submit', searchFormHandler);

export function searchFormHandler(event) {
  event.preventDefault();

  if (!event.currentTarget.elements.query.value) {
    showMessageNoInput();
    return;
  }

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  apiService.page = 1;

  clearGallery();
  fetchMovies();
  form.reset();
}

export function fetchMovies() {
  apiService.fetchMovies().then(({ results }) => {
    spinner.showSpinner();
    setTimeout(function () {
      spinner.hideSpinner();
    }, 750);

    galleryMarkup(results);
    pagination.reset(results.total_resulrs);

    if (results.length === 0) {
      showMessageInvalidRequest();
      plugMarkup();

      const plugTextRef = document.querySelector('.plug-box__text');

      if (apiService._lang === 'ru-RU') {
        plugTextRef.textContent = 'Фильмы не найдены!';
      } else if (apiService._lang === 'en-US') {
        plugTextRef.textContent = 'Movies not found!';
      }

      refs.paginationContainerRef.classList.add('tui-pagination--hidden');
    } else {
      refs.paginationContainerRef.classList.remove('tui-pagination--hidden');
    }
    refs.libraryPaginationContainerRef.classList.add('tui-pagination--hidden');
  });
}

export async function startPage() {
  await apiService.fetchGenres();
  fetchMovies();
}

export function galleryMarkup(movies) {
  const markup = gallery(movies);

  refs.contentRef.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  refs.contentRef.innerHTML = '';
}

startPage();
