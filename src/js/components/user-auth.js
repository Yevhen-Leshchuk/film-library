import { clearGallery, startPage } from '../components/content';
import { showHeaderHome } from '../components/header';
import { closeModal } from '../components/modal-forms';
import { getUserLibrary } from '../components/user-library';

export function userDataMarkup() {
  const headerUserRef = document.querySelector('.header-user');
  const headerBtnLibrRef = document.querySelector('.header-library-btn');
  const headerEntranceRef = document.querySelector('.header-entrance__icon');
  const headerExitRef = document.querySelector('.header-exit-btn');

  const userStorage = localStorage.getItem('user');
  const userData = JSON.parse(userStorage);

  if (
    userData === undefined ||
    (userData.name !== '' && userData.email !== '' && userData.password !== '')
  ) {
    headerUserRef.classList.add('header-user--visible');
    headerExitRef.classList.add('header-exit__btn--visible');
    headerEntranceRef.classList.add('header-entrance__icon--hidden');

    if (userData !== undefined) {
      headerUserRef.textContent = `Hi, ${userData.name}`;
      headerBtnLibrRef.classList.add('header-button--visible');
    }
  }
}

export function exitAccount(event) {
  event.preventDefault();

  const headerUserRef = document.querySelector('.header-user');
  const headerBtnLibrRef = document.querySelector('.header-library-btn');
  const headerEntranceRef = document.querySelector('.header-entrance__icon');
  const headerExitRef = document.querySelector('.header-exit-btn');

  const userStorage = localStorage.getItem('user');
  let userData = JSON.parse(userStorage);

  logOut(userData.token);
  userData = localStorage.removeItem('user');

  if (!userData) {
    headerUserRef.classList.remove('header-user--visible');
    headerExitRef.classList.remove('header-exit__btn--visible');
    headerEntranceRef.classList.remove('header-entrance__icon--hidden');
    headerBtnLibrRef.classList.remove('header-button--visible');
  }

  showHeaderHome();
  clearGallery();
  startPage();
}

function showWelcomeSign(userData) {
  const welcomeSignUpRef = document.querySelector('.welcome-sign-up');
  const welcomeSignUpTitleRef = document.querySelector('.welcome-sign-up__title');

  welcomeSignUpRef.classList.remove('welcome-sign--hidden');
  welcomeSignUpTitleRef.textContent = `${userData.name},`;

  setTimeout(() => {
    closeModal();
  }, 2000);
}

export function signUp({ name, email, password }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  };

  return fetch('http://localhost:8080/api/v1/auth/signup', options)
    .then(res => res.json())
    .then(data => {
      if (data.code === 201 && data.status === 'success') {
        let userData = data.data.user;
        userData = {
          ...userData,
          films: [],
        };

        localStorage.setItem('user', JSON.stringify(userData));
        userDataMarkup();
        setTimeout(() => {
          showWelcomeSign(userData);
        }, 1000);
      }
    })
    .catch(error => console.log('error from signup', error));
}

export function signIn({ email, password }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch('http://localhost:8080/api/v1/auth/signin', options)
    .then(res => res.json())
    .then(data => {
      if (data.code === 200 && data.status === 'success') {
        getUserLibrary(data);

        let userData = data.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        userDataMarkup();
        setTimeout(() => {
          showWelcomeSign(userData);
        }, 1000);
      }
    })
    .catch(error => console.log('error from signin', error));
}

export function logOut(token) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  fetch('http://localhost:8080/api/v1/auth/logout', options)
    .then(res => res.json())
    .then(data => {
      if (data.code === 204 && data.status === 'success') {
        localStorage.removeItem('queueStorage');
        localStorage.removeItem('watchedStorage');
      }
    })
    .catch(error => console.log('error from logout', error));
}
