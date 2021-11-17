import gallery from '../../templates/content.hbs';
import pagination from '../components/pagination';
import refs from '../refs';
import { apiService } from '../services/api';
import { searchFormRef } from '../components/header';

searchFormRef.addEventListener('submit', searchFormHandler);

export function searchFormHandler(event) {
  event.preventDefault();

  if (!event.currentTarget.elements.query.value) return;

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearGallery();
  fetchMovies();
  form.reset();
}

export function fetchMovies() {
  apiService.fetchMovies().then(({ results }) => {
    // console.log(results);

    galleryMarkup(results);
    pagination.reset(results.total_resulrs);
  });
}

function startPage() {
  apiService.fetchGenres();
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
