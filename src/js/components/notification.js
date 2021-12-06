import { notice, info } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export function showMessageNoInput() {
  return notice({
    text: 'No input! Please enter query!',
    width: '370px',
  });
}

export function showMessageInvalidRequest() {
  return notice({
    text: 'Search result not successful. Enter the correct movie name.',
    width: '370px',
  });
}

export function showMessageStorageEmpty() {
  return info({
    text: 'Library is Empty!',
    width: '370px',
  });
}

export function showMessageStorageFuul() {
  return info({
    text: 'Library is Full! Please, clear library.',
    width: '370px',
  });
}

export function showMessageSameMovies() {
  return info({
    text: 'You cannot add this movie, it is in a different category!',
    width: '370px',
  });
}
