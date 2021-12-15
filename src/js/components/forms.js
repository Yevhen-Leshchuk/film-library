export function getForms() {
  const refs = {
    controls: document.querySelector('#controls'),
    formSignIn: document.querySelector('.form-sign-in'),
    formSignUp: document.querySelector('.form-sign-up'),
  };

  refs.controls.addEventListener('click', onControlClick);

  function onControlClick(event) {
    event.preventDefault();

    if (event.target.nodeName !== 'BUTTON') {
      return;
    }
    const controlItem = event.target;
    controlItem.getAttribute('button[data-action]');
    const getElement = controlItem;

    const currentActiveControlItem = refs.controls.querySelector('.control-btn--active');
    if (currentActiveControlItem) {
      currentActiveControlItem.classList.remove('control-btn--active');
    }
    getElement.classList.add('control-btn--active');

    if (getElement.dataset.action === 'sign-up') {
      refs.formSignIn.classList.add('form-sign--hidden');
      refs.formSignUp.classList.remove('form-sign--hidden');
    } else {
      refs.formSignIn.classList.remove('form-sign--hidden');
      refs.formSignUp.classList.add('form-sign--hidden');
    }
  }
}
