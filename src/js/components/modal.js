import refs from '../refs';
import movieCard from '../../templates/movie-card.hbs';
import { apiService } from '../services/api';

refs.contentRef.addEventListener('click', openModal);
refs.modalRef.addEventListener('click', onLightboxClick);

let imgId;

function openModal(event) {
  event.preventDefault();
  const imgRef = event.target;
  imgId = imgRef.dataset.id;
  imgId = Number(imgId);

  if (imgRef.nodeName !== 'IMG') {
    return;
  }

  fetchMovie();

  refs.modalRef.classList.remove('backdrop--hidden');
  refs.bodyRef.classList.add('body--hidden');

  window.addEventListener('keydown', onKeyPress);
}

function closeModal() {
  refs.modalRef.classList.add('backdrop--hidden');

  window.removeEventListener('keydown', onKeyPress);
  refs.bodyRef.classList.remove('body--hidden');

  refs.modalRef.innerHTML = '';
}

function onLightboxClick(event) {
  if (event.target === event.currentTarget) closeModal();
}

function onKeyPress(event) {
  if (event.code === 'Escape') closeModal();
}

function fetchMovie() {
  apiService.fetchMovies().then(({ results }) => {
    console.log(results);
    getElementById(results);
  });
}

function getElementById(results) {
  results.map(result => {
    if (result.id === imgId) movieCardMarkup(result);
  });

  const closeModalRef = document.querySelector('.close-modal');
  closeModalRef.addEventListener('click', closeModal);
}

function movieCardMarkup(result) {
  const markup = movieCard(result);

  refs.modalRef.insertAdjacentHTML('beforeend', markup);
}
