import refs from '../refs';
import movieCard from '../../templates/movie-card.hbs';
import { apiService } from '../services/api';
import Modal from '../components/modal-app';

const modalMovieCard = new Modal({
  rootSelector: '.content',
  body: 'body',
  activeModalClass: 'backdrop--hidden',
  removeScrollClass: 'body--hidden',
  modalClass: '.backdrop',
  fetch: fetchMovie,
  movieCardMarkup: movieCardMarkup,
});

console.log(modalMovieCard);

function fetchMovie() {
  apiService.fetchMovies().then(({ results }) => {
    modalMovieCard._getElementById(results);
  });
}

function movieCardMarkup(result) {
  const markup = movieCard(result);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);
}
