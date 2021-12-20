import plug from '../../images/content/plug.png';
import refs from '../refs';

export function plugMarkup() {
  const markup = `<div class="plug-box"><img src="./${plug}" /></div>`;
  refs.contentRef.insertAdjacentHTML('beforeend', markup);
}
