import LocalizedStrings from 'localized-strings';
import { apiService } from '../services/api';
import { getRefs } from '../refs';

export const getLang = () => {
  const lang = localStorage.getItem('language');
  apiService._lang = lang;
  if (lang) {
    document.scrollingElement.lang = (lang[3] + lang[4]).toLowerCase();
    setClassLangControl(lang);
    return lang;
  } else {
    localStorage.setItem('language', 'en-US');
    document.scrollingElement.lang = 'en';
    return 'en-US';
  }
};

export async function setClassLangControl(lang) {
  const langEngRef = document.querySelector('[data-set="en-US"]');
  const langRuRef = document.querySelector('[data-set="ru-RU"]');

  if (lang === 'ru-RU') {
    if (langRuRef === null || langEngRef === null) return;

    langRuRef.classList.add('control__languages-link--active');
    langEngRef.classList.remove('control__languages-link--active');
  } else {
    if (langRuRef === null || langEngRef === null) return;

    langRuRef.classList.remove('control__languages-link--active');
    langEngRef.classList.add('control__languages-link--active');
  }
}

function getCustomInterfaceLanguage() {
  return getLang();
}

const getLocalsStrings = () => {
  let strings = new LocalizedStrings(
    {
      'en-US': {
        home_btn_text: 'Home',
        my_library_btn_text: 'my library',
        search_films_text: 'Search Movies',
        watched_library_btn_text: 'Watched',
        queue_library_btn_text: 'Queue',
        control_sign_up_text: 'Sign Up',
        control_sign_in_text: 'Sign In',
        form_sign_up_field_username_text: 'User Name',
        form_sign_up_input_username_text: 'Name',
        form_sign_up_field_email_text: 'Email',
        form_sign_up_input_email_text: 'Mail',
        form_sign_up_field_password_text: 'Password',
        form_sign_up_input_password_text: 'Password',
        submit_btn_sign_up_text: 'Submit',
        form_sign_in_field_email_text: 'Email',
        form_sign_in_input_email_text: 'Mail',
        form_sign_in_field_password_text: 'Password',
        form_sign_in_input_password_text: 'Password',
        submit_btn_sign_in_text: 'Submit',
        welcome_in_library_text: 'Welcome in FilmLibrary!',
        vote_text: 'Vote / Votes',
        popularity_text: 'Popularity',
        original_title_text: 'Original Title',
        genre_text: 'Genre',
        about_text: 'About',
        add_watched_btn_text: 'add to Watched',
        add_queue_btn_text: 'add to queue',
        copyright_text: '| All Rights Reserved |',
        developer_text: 'Developed with',
        developer_by_text: 'by',
        team_content__text_text: 'Frontend Developer',
        team_content__title_text: 'Yevhen Leshchuk',
      },
      'ru-RU': {
        home_btn_text: 'Главная',
        my_library_btn_text: 'моя Библиотека',
        search_films_text: 'Поиск фильмов',
        watched_library_btn_text: 'Просмотренные',
        queue_library_btn_text: 'Посмотреть',
        control_sign_up_text: 'Регистрация',
        control_sign_in_text: 'Вход',
        form_sign_up_field_username_text: 'Имя Пользователя',
        form_sign_up_input_username_text: 'Имя',
        form_sign_up_field_email_text: 'Почта',
        form_sign_up_input_email_text: 'Почта',
        form_sign_up_field_password_text: 'Пароль',
        form_sign_up_input_password_text: 'Пароль',
        submit_btn_sign_up_text: 'Отправить',
        form_sign_in_field_email_text: 'Почта',
        form_sign_in_input_email_text: 'Почта',
        form_sign_in_field_password_text: 'Пароль',
        form_sign_in_input_password_text: 'Пароль',
        submit_btn_sign_in_text: 'Отправить',
        welcome_in_library_text: 'Добро пожаловать в FilmLibrary!',
        vote_text: 'Голосование / Голосов',
        popularity_text: 'Популярность',
        original_title_text: 'Оригинальное название',
        genre_text: 'Жанр',
        about_text: 'Описание фильма',
        add_watched_btn_text: 'добавить в Просмотренные',
        add_queue_btn_text: 'смотреть Позже',
        copyright_text: '| Все права защищены |',
        developer_text: 'Разработано с',
        developer_by_text: '',
        team_content__text_text: 'Фронтенд-разработчик',
        team_content__title_text: 'Евгений Лещук',
      },
    },
    {
      customLanguageInterface: getCustomInterfaceLanguage,
    },
  );
  return strings;
};

let strings = getLocalsStrings();

export function doLocalization() {
  const localRefs = getRefs();

  const totalSrtings = Object.keys(localRefs).length;

  for (let i = 0; i < totalSrtings; i++) {
    const refName = Object.keys(localRefs)[i];

    const ref = localRefs[refName];

    const string = refName.slice(0, length - 3) + 'text';

    if (ref) {
      if (ref.nodeName === 'INPUT') {
        ref.placeholder = strings.getString(string);
      } else {
        ref.textContent = strings.getString(string);
      }
    }
  }
}

export function changeLanguage(newLang) {
  const currentLang = localStorage.getItem('language');
  if (currentLang !== newLang) {
    localStorage.setItem('language', newLang);

    location.reload();
  }
}
