import refs from '../refs';
import trailer from '../../templates/trailer.hbs';
import { api_key, baseURL } from '../services/api';
import { trailerErrorMarkup } from '../components/plug';
import { apiService } from '../services/api';

refs.contentRef.addEventListener('click', onPlayTrailer);
refs.modalRef.addEventListener('click', onLightboxClick);

function fetchTrailerFilm(movieId) {
  return fetch(`${baseURL}/movie/${movieId}/videos?api_key=${api_key}&language=${apiService._lang}`)
    .then(response => response.json())
    .then(videos => {
      const trailerKey = videos.results[0].key;

      trailerModalMarkup(trailerKey);
    })
    .catch(error => {
      trailerErrorMarkup();
    });
}

function onPlayTrailer(event) {
  event.preventDefault();

  if (event.target.dataset.action !== 'trailer') {
    return;
  }

  const movieId = event.target.closest('li').dataset.id;

  fetchTrailerFilm(movieId);

  refs.modalRef.classList.remove('backdrop--hidden');
  refs.bodyRef.classList.remove('body_landscape--hidden');
  refs.htmlRef.classList.remove('is-landscape');

  window.addEventListener('keydown', onKeyPress);
}

export function getMovieCardTrailer() {
  const trailerBtn = document.querySelector('.movie-desc__trailer');
  trailerBtn.addEventListener('click', onMovieCardTrailer);

  function onMovieCardTrailer(event) {
    event.preventDefault();
    const trailerKey = event.currentTarget.dataset.id;
    fetchTrailerFilm(trailerKey);

    refs.modalRef.classList.remove('backdrop--hidden');
    refs.bodyRef.classList.remove('body_landscape--hidden');
    refs.htmlRef.classList.remove('is-landscape');

    window.addEventListener('keydown', onKeyPress);
    removeMovieCard();
  }
}

function closeModal() {
  refs.modalRef.classList.add('backdrop--hidden');
  refs.bodyRef.classList.remove('body--hidden');

  refs.modalRef.innerHTML = '';

  window.removeEventListener('keydown', onKeyPress);
}

function onLightboxClick(event) {
  if (event.target === event.currentTarget) closeModal();
}

function onKeyPress(event) {
  if (event.code === 'Escape') closeModal();
}

function trailerModalMarkup(trailerKey) {
  const markup = trailer(trailerKey);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);

  const closeModalBtnRef = document.querySelector('.trailer-btn');
  closeModalBtnRef.addEventListener('click', closeModal);
}

export function getRefsMovieCard() {
  return {
    movieCardRef: document.querySelector('.movie-card '),
  };
}

function removeMovieCard() {
  getRefsMovieCard().movieCardRef.classList.add('movie-card--hidden');
}
