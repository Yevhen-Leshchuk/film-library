import { signUp, signIn } from '../components/user-auth';
import { clearStylesSignUpForm, clearStylesSignInForm } from '../components/form-validation';

export function getForms() {
  const refs = {
    controls: document.querySelector('#controls'),
    formSignIn: document.querySelector('.form-sign-in'),
    formSignUp: document.querySelector('.form-sign-up'),
    formMessageErr: document.querySelector('.error'),
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

      refs.formSignIn.reset();
      clearStylesSignUpForm();
    } else {
      refs.formSignIn.classList.remove('form-sign--hidden');
      refs.formSignUp.classList.add('form-sign--hidden');

      refs.formSignUp.reset();
      clearStylesSignInForm();
    }
  }

  let id = id => document.getElementById(id);

  let formIn = id('form-in'),
    formUp = id('form-up');

  formUp.addEventListener('submit', formUpHandler);
  formIn.addEventListener('submit', formInHandler);

  function formUpHandler(event) {
    event.preventDefault();
    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedSignUpData = {};

    formData.forEach((value, key) => {
      submittedSignUpData[key] = value;
    });

    signUp(submittedSignUpData);
  }

  function formInHandler(event) {
    event.preventDefault();

    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedSignInData = {};

    formData.forEach((value, key) => {
      submittedSignInData[key] = value;
    });

    signIn(submittedSignInData);
  }
}
