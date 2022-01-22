import refs from '../refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const checkboxRef = document.querySelector('#theme-switch-toggle');
const iconSunRef = document.querySelector('#sun');
const iconMoonRef = document.querySelector('#moon');

checkboxRef.addEventListener('change', chooseTheme);

function chooseTheme(e) {
  if (e.target.checked) {
    chooseDarkTheme();
    return;
  }
  chooseLightTheme();
}

function currentTheme() {
  const theme = localStorage.getItem('theme');

  if (theme === Theme.LIGHT || theme === null) {
    chooseLightTheme();
    return;
  }

  chooseDarkTheme();
}

function chooseDarkTheme() {
  refs.bodyRef.classList.add(Theme.DARK);
  refs.bodyRef.classList.remove(Theme.LIGHT);
  iconSunRef.classList.remove('theme-switch__icon--active');
  iconMoonRef.classList.add('theme-switch__icon--active');

  checkboxRef.checked = true;
  localStorage.setItem('theme', Theme.DARK);
}

function chooseLightTheme() {
  refs.bodyRef.classList.add(Theme.LIGHT);
  refs.bodyRef.classList.remove(Theme.DARK);
  iconSunRef.classList.add('theme-switch__icon--active');
  iconMoonRef.classList.remove('theme-switch__icon--active');

  checkboxRef.checked = false;
  localStorage.setItem('theme', Theme.LIGHT);
}

currentTheme();
