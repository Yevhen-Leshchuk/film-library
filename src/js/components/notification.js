import { notice, error } from '../../../_snowpack/pkg/@pnotify/core/dist/PNotify.js';
import '../../../_snowpack/pkg/@pnotify/core/dist/PNotify.css.proxy.js';
import '../../../_snowpack/pkg/@pnotify/core/dist/BrightTheme.css.proxy.js';
import { apiService } from '../services/api.js';

export function showMessageNoInput() {
  if (apiService._lang === 'ru-RU') {
    return notice({
      text: 'Вы ничего не ввели! Пожалуйста, введите запрос!',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return notice({
      text: 'No input! Please enter query!',
      width: '370px',
    });
  }
}

export function showMessageInvalidRequest() {
  if (apiService._lang === 'ru-RU') {
    return notice({
      text: 'Фильм не найден! Введите правильное название фильма.',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return notice({
      text: 'Search result not successful. Enter the correct movie name.',
      width: '370px',
    });
  }
}

export function showMessageStorageEmpty() {
  if (apiService._lang === 'ru-RU') {
    return notice({
      text: 'Ваша библиотека пуста.',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return notice({
      text: 'Library is empty!',
      width: '370px',
    });
  }
}

export function showMessageStorageFuul() {
  if (apiService._lang === 'ru-RU') {
    return notice({
      text: 'Ваша библиотека заполнена. Пожалуйста, очистите библиотеку!',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return notice({
      text: 'Library is full! Please, clear library.',
      width: '370px',
    });
  }
}

export function showMessageSameMovies() {
  if (apiService._lang === 'ru-RU') {
    return notice({
      text: 'Вы не можете добавить этот фильм, он находится в другой категории!',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return notice({
      text: 'You cannot add this movie, it is in a different category!',
      width: '370px',
    });
  }
}

export function showMessageLimitAccounts() {
  if (apiService._lang === 'ru-RU') {
    return error({
      text: 'Превышен лимит запросов на ваш IP-адрес. Попробуйте позже!',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return error({
      text: 'Your IP address has reached the limit for creating accounts. Try later!',
      width: '370px',
    });
  }
}

export function showMessageNoAuth() {
  if (apiService._lang === 'ru-RU') {
    return notice({
      text: 'Пожалуйста, войдите или зарегистрируйтесь!',
      width: '370px',
    });
  } else if (apiService._lang === 'en-US') {
    return notice({
      text: 'Please, sign in or sign up!',
      width: '370px',
    });
  }
}
