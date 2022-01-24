import plugImg from '../../images/content/plug.png';
import plugTemplate from '../../templates/plug.hbs';
import youtubeError from '../../images/content/youtube-broken.jpg';
import refs from '../refs';

export function plugMarkup() {
  const markup = plugTemplate(plugImg);

  refs.contentRef.insertAdjacentHTML('beforeend', markup);
}

export function trailerErrorMarkup() {
  const markup = `<div class="error-box"><img class="error-box__img" width="1000" height="600" src="./${youtubeError}" alt="trailer not found" class="trailer"></div>`;
  refs.modalRef.innerHTML = markup;
}
