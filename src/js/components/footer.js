import footer from '../../templates/footer.hbs';
import icon from '../../images/sprite/sprite.svg';
import refs from '../refs';

function footerMarkup() {
  const markup = footer(icon);
  refs.footerContainerRef.insertAdjacentHTML('beforeend', markup);
}

footerMarkup();
