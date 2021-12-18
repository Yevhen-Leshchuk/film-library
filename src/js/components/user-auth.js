import { clearGallery, startPage } from '../components/content';
import { showHeaderHome } from '../components/header';

export function getSubmittedData(formData) {
  const submittedData = {};

  formData.forEach((value, key) => {
    submittedData[key] = value;
  });

  console.log(submittedData);
  userDataMarkup(submittedData);
}

export function userDataMarkup(submittedData) {
  const headerUserRef = document.querySelector('.header-user');
  const headerExitRef = document.querySelector('.header-exit__icon');
  const headerBtnLibrRef = document.querySelector('.header-library-btn');
  const headerEntranceRef = document.querySelector('.header-entrance__icon');

  if (
    submittedData === undefined ||
    (submittedData.username !== '' && submittedData.email !== '' && submittedData.password !== '')
  ) {
    headerUserRef.classList.add('header-user--visible');
    headerExitRef.classList.add('header-exit__icon--visible');
    headerEntranceRef.classList.add('header-entrance__icon--hidden');

    if (submittedData !== undefined) {
      headerUserRef.textContent = submittedData.username;
      headerBtnLibrRef.classList.add('header-button--visible');
    }
  }
  headerExitRef.addEventListener('click', exitAccount);

  function exitAccount(event) {
    event.preventDefault();

    headerUserRef.classList.remove('header-user--visible');
    headerExitRef.classList.remove('header-exit__icon--visible');
    headerEntranceRef.classList.remove('header-entrance__icon--hidden');
    headerBtnLibrRef.classList.remove('header-button--visible');

    showHeaderHome();
    clearGallery();
    startPage();
  }
}
