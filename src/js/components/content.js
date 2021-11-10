import gallery from '../../templates/content.hbs';
import logo from '../../images/sprite/sprite.svg';
import { apiService } from '../services/api';
import refs from '../refs';

function galleryMarkup(movies) {
  const markup = gallery(movies);

  refs.contentRefs.insertAdjacentHTML('beforeend', markup);
}

function fetchMovies() {
  apiService.fetchMovies().then(({ results }) => {
    console.log(results);
    galleryMarkup(results);
  });
}

function startPage() {
  apiService.fetchGenres();
  fetchMovies();
}

startPage();
