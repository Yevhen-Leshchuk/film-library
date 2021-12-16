import { closeModal } from '../components/modal-forms';

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

      refs.formSignIn.reset();
      clearStylesForm(username, 0);
      clearStylesForm(email, 1);
      clearStylesForm(password, 2);
    } else {
      refs.formSignIn.classList.remove('form-sign--hidden');
      refs.formSignUp.classList.add('form-sign--hidden');

      refs.formSignUp.reset();

      clearStylesForm(emailIn, 3);
      clearStylesForm(passwordIn, 4);
    }
  }

  //-----forms validation------------

  let id = id => document.getElementById(id);

  let classes = classes => document.getElementsByClassName(classes);

  let username = id('username'),
    email = id('email'),
    password = id('password'),
    formIn = id('form-in'),
    formUp = id('form-up'),
    errorMsg = classes('error'),
    successIcon = classes('form-sign__success-icon'),
    failureIcon = classes('form-sign__failure-icon');

  formUp.addEventListener('submit', formUpHandler);
  formIn.addEventListener('submit', formInHandler);

  function formUpHandler(event) {
    event.preventDefault();

    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedData = {};

    formData.forEach((value, key) => {
      submittedData[key] = value;
    });

    console.log(submittedData);

    engine(username, 0, 'Username cannot be blank');
    engine(email, 1, 'Email cannot be blank');
    engine(password, 2, 'Password cannot be blank');
  }

  function formInHandler(event) {
    event.preventDefault();

    const formRef = event.target;
    const formData = new FormData(formRef);
    const submittedData = {};

    formData.forEach((value, key) => {
      submittedData[key] = value;
    });

    console.log(submittedData);

    engine(emailIn, 3, 'Email cannot be blank');
    engine(passwordIn, 4, 'Password cannot be blank');
  }

  let engine = (id, serial, message) => {
    if (id.value.trim() === '') {
      errorMsg[serial].innerHTML = message;
      id.classList.add('form-sign__input--error');

      // icons
      failureIcon[serial].style.opacity = '1';
      successIcon[serial].style.opacity = '0';
    } else {
      errorMsg[serial].innerHTML = '';
      id.classList.add('form-sign__input--success');

      // icons
      failureIcon[serial].style.opacity = '0';
      successIcon[serial].style.opacity = '1';
      // closeModal();
    }
  };

  function clearStylesForm(id, serial) {
    if (id === id) {
      failureIcon[serial].style.opacity = '0';
      successIcon[serial].style.opacity = '0';
      errorMsg[serial].innerHTML = '';
      id.classList.remove('form-sign__input--error');
      id.classList.remove('form-sign__input--success');
    }
  }
}
