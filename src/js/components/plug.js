import plug from '../../images/content/plug.png';
import youtubeError from '../../images/content/youtube-broken.jpg';
import refs from '../refs';

export function plugMarkup() {
  const markup = `<div class="plug-box"><img src="./${plug}" /></div>`;
  refs.contentRef.insertAdjacentHTML('beforeend', markup);
}

export function trailerErrorMarkup() {
  const markup = `<div class="error-box"><img class="error-box__img" width="1000" height="600" src="./${youtubeError}" alt="trailer not found" class="trailer"></div>`;
  refs.modalRef.innerHTML = markup;
}
