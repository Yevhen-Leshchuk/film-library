import { apiService } from '../services/api';

/**
 * forms validation
 **/
export function checkSignUpForm(data) {
  /**
   * username
   **/
  if (
    data.code === 400 &&
    data.message === 'Field name is not allowed to be empty' &&
    refsFormEl().formSignUpInputName.value === ''
  ) {
    refsFormEl().formSignUpInputName.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconName.style.opacity = '0';

    refsFormEl().formSignUpInputName.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationName.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationName.textContent = 'Поле "имя" не может быть пустым';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationName.textContent =
        'Field "name" is not allowed to be empty';
    }

    refsFormEl().formSignUpFailureIconName.style.opacity = '1';
  } else if (refsFormEl().formSignUpInputName.value !== '') {
    refsFormEl().formSignUpInputName.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationName.classList.remove('error-visible');
    refsFormEl().formSignUpInputName.classList.add('form-sign__input--success');
    refsFormEl().formSignUpErrorNotificationName.textContent = '';
    refsFormEl().formSignUpFailureIconName.style.opacity = '0';
    refsFormEl().formSignUpSuccessIconName.style.opacity = '1';
  }

  if (
    (data.code === 400 &&
      data.message === 'Field name length must be at least 2 characters long') ||
    data.message === 'Field name length must be less than or equal to 30 characters long'
  ) {
    refsFormEl().formSignUpInputName.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconName.style.opacity = '0';

    refsFormEl().formSignUpInputName.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationName.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      if (data.message === 'Field name length must be at least 2 characters long') {
        refsFormEl().formSignUpErrorNotificationName.textContent =
          'Длина поля "имя" должна быть не менее 2 символов';
      }
    } else if (apiService._lang === 'en-US') {
      if (data.message === 'Field name length must be at least 2 characters long') {
        refsFormEl().formSignUpErrorNotificationName.textContent =
          'Field "name" length must be at least 2 characters long';
      }
    }

    if (apiService._lang === 'ru-RU') {
      if (data.message === 'Field name length must be less than or equal to 30 characters long') {
        refsFormEl().formSignUpErrorNotificationName.textContent =
          'Длина поля "имя" должна быть меньше или равна 30 символам';
      }
    } else if (apiService._lang === 'en-US') {
      if (data.message === 'Field name length must be less than or equal to 30 characters long') {
        refsFormEl().formSignUpErrorNotificationName.textContent =
          'Field "name" length must be less than or equal to 30 characters long';
      }
    }

    refsFormEl().formSignUpFailureIconName.style.opacity = '1';
  }

  if (
    data.code === 400 &&
    data.message === 'Field name must only contain alpha-numeric characters'
  ) {
    refsFormEl().formSignUpInputName.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconName.style.opacity = '0';

    refsFormEl().formSignUpInputName.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationName.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationName.textContent =
        'Поле "имя" должно содержать только буквенно-цифровые символы';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationName.textContent =
        'Field "name" must only contain alpha-numeric characters';
    }

    refsFormEl().formSignUpFailureIconName.style.opacity = '1';
  }

  /**
   * mail
   **/
  if (data.code === 400 && data.message === 'Field email is not allowed to be empty') {
    refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconEmail.style.opacity = '0';

    refsFormEl().formSignUpInputEmail.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationEmail.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationEmail.textContent =
        'Поле "почта" не может быть пустым';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationEmail.textContent =
        'Field "email" is not allowed to be empty';
    }

    refsFormEl().formSignUpFailureIconEmail.style.opacity = '1';
  } else if (
    refsFormEl().formSignUpInputEmail.value !== '' &&
    data.message !== 'Field name is not allowed to be empty' &&
    data.message !== 'Field name length must be at least 2 characters long' &&
    data.message !== 'Field name must only contain alpha-numeric characters' &&
    data.message !== 'Field name length must be less than or equal to 30 characters long'
  ) {
    refsFormEl().formSignUpInputPassword.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationPassword.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationPassword.textContent =
        'Поле "пароль" не может быть пустым';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationPassword.textContent =
        'Field "password" is not allowed to be empty';
    }

    refsFormEl().formSignUpFailureIconPassword.style.opacity = '1';

    refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationEmail.classList.remove('error-visible');
    refsFormEl().formSignUpInputEmail.classList.add('form-sign__input--success');

    refsFormEl().formSignUpErrorNotificationEmail.textContent = '';
    refsFormEl().formSignUpFailureIconEmail.style.opacity = '0';
    refsFormEl().formSignUpSuccessIconEmail.style.opacity = '1';
  }

  if (data.code === 409 && data.message === 'Provided email already exists') {
    refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconEmail.style.opacity = '0';

    refsFormEl().formSignUpInputEmail.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationEmail.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationEmail.textContent =
        'Адрес электронной почты уже существует';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationEmail.textContent = 'Provided email already exists';
    }

    refsFormEl().formSignUpFailureIconEmail.style.opacity = '1';

    if (
      refsFormEl().formSignUpErrorNotificationEmail.textContent === 'Provided email already exists'
    ) {
      refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--success');
      refsFormEl().formSignUpInputEmail.classList.add('form-sign__input--error');

      refsFormEl().formSignUpSuccessIconEmail.style.opacity = '0';
      refsFormEl().formSignUpFailureIconEmail.style.opacity = '1';
    }
  }

  if (data.code === 400 && data.message === 'Field email must be a valid email') {
    refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpFailureIconPassword.style.opacity = '0';
    refsFormEl().formSignUpErrorNotificationPassword.textContent = '';

    refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconEmail.style.opacity = '0';

    refsFormEl().formSignUpInputEmail.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationEmail.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationEmail.textContent =
        'Невалидный адрес электронной почты';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationEmail.textContent =
        'Field email must be a valid email';
    }

    refsFormEl().formSignUpFailureIconEmail.style.opacity = '1';
  }

  /**
   * pass
   **/
  if (data.code === 400 && data.message === 'Field password is not allowed to be empty') {
    refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconPassword.style.opacity = '0';

    refsFormEl().formSignUpInputPassword.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationPassword.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignUpErrorNotificationPassword.textContent =
        'Поле "пароль" не может быть пустым';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignUpErrorNotificationPassword.textContent =
        'Field password is not allowed to be empty';
    }

    refsFormEl().formSignUpFailureIconPassword.style.opacity = '1';
  } else if (
    refsFormEl().formSignUpInputPassword.value != '' &&
    data.message !== 'Field name is not allowed to be empty' &&
    data.message !== 'Field email is not allowed to be empty' &&
    data.message !== 'Field email must be a valid email'
  ) {
    refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationPassword.classList.remove('error-visible');
    refsFormEl().formSignUpInputPassword.classList.add('form-sign__input--success');
    refsFormEl().formSignUpErrorNotificationPassword.textContent = '';
    refsFormEl().formSignUpFailureIconPassword.style.opacity = '0';
    refsFormEl().formSignUpSuccessIconPassword.style.opacity = '1';
  }

  if (
    (data.code === 400 &&
      data.message === 'Field password length must be at least 8 characters long') ||
    data.message === 'Field password length must be less than or equal to 20 characters long'
  ) {
    refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--success');
    refsFormEl().formSignUpSuccessIconPassword.style.opacity = '0';

    refsFormEl().formSignUpInputPassword.classList.add('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationPassword.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      if (data.message === 'Field password length must be at least 8 characters long') {
        refsFormEl().formSignUpErrorNotificationPassword.textContent =
          'Длина поля "пароль" должна быть не менее 8 символов.';
      }
    } else if (apiService._lang === 'en-US') {
      if (data.message === 'Field password length must be at least 8 characters long') {
        refsFormEl().formSignUpErrorNotificationPassword.textContent =
          'Field "password" length must be at least 8 characters long';
      }
    }

    if (apiService._lang === 'ru-RU') {
      if (
        data.message === 'Field password length must be less than or equal to 20 characters long'
      ) {
        refsFormEl().formSignUpErrorNotificationPassword.textContent =
          'Длина поля "пароль" должна быть меньше или равна 20 символам';
      }
    } else if (apiService._lang === 'en-US') {
      if (
        data.message === 'Field password length must be less than or equal to 20 characters long'
      ) {
        refsFormEl().formSignUpErrorNotificationPassword.textContent =
          'Field "password" length must be less than or equal to 20 characters long';
      }
    }

    refsFormEl().formSignUpFailureIconPassword.style.opacity = '1';
  }

  /**
   * success
   **/
  if (data.code === 201 && data.status === 'success') {
    refsFormEl().formSignUpInputName.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationName.classList.remove('error-visible');
    refsFormEl().formSignUpInputName.classList.add('form-sign__input--success');
    refsFormEl().formSignUpErrorNotificationName.textContent = '';
    refsFormEl().formSignUpFailureIconName.style.opacity = '0';
    refsFormEl().formSignUpSuccessIconName.style.opacity = '1';

    refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationEmail.classList.remove('error-visible');
    refsFormEl().formSignUpInputEmail.classList.add('form-sign__input--success');
    refsFormEl().formSignUpErrorNotificationEmail.textContent = '';
    refsFormEl().formSignUpFailureIconEmail.style.opacity = '0';
    refsFormEl().formSignUpSuccessIconEmail.style.opacity = '1';

    refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--error');
    refsFormEl().formSignUpErrorNotificationPassword.classList.remove('error-visible');
    refsFormEl().formSignUpInputPassword.classList.add('form-sign__input--success');
    refsFormEl().formSignUpErrorNotificationPassword.textContent = '';
    refsFormEl().formSignUpFailureIconPassword.style.opacity = '0';
    refsFormEl().formSignUpSuccessIconPassword.style.opacity = '1';
  }
}

export function checkSignInForm(data) {
  /**
   * mail
   **/
  if (
    data.code === 400 &&
    data.message === 'Field email is not allowed to be empty' &&
    refsFormEl().formSignInInputEmail.value === ''
  ) {
    refsFormEl().formSignInInputEmail.classList.add('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationEmail.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignInErrorNotificationEmail.textContent =
        'Поле "почта" не может быть пустым';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignInErrorNotificationEmail.textContent =
        'Field "email" is not allowed to be empty';
    }

    refsFormEl().formSignInFailureIconEmail.style.opacity = '1';
  } else {
    refsFormEl().formSignInInputEmail.classList.remove('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationEmail.classList.remove('error-visible');
    refsFormEl().formSignInErrorNotificationEmail.textContent = '';
    refsFormEl().formSignInFailureIconEmail.style.opacity = '0';
  }

  if (
    data.code === 401 &&
    data.message === 'Invalid credentials' &&
    refsFormEl().formSignInInputEmail
  ) {
    refsFormEl().formSignInInputEmail.classList.add('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationEmail.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignInErrorNotificationEmail.textContent = 'Данные недействительны';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignInErrorNotificationEmail.textContent = 'Invalid credentials';
    }

    refsFormEl().formSignInFailureIconEmail.style.opacity = '1';

    if (refsFormEl().formSignInErrorNotificationEmail.textContent === 'Invalid credentials') {
      refsFormEl().formSignInInputEmail.classList.remove('form-sign__input--success');
      refsFormEl().formSignInInputEmail.classList.add('form-sign__input--error');

      refsFormEl().formSignInSuccessIconEmail.style.opacity = '0';
      refsFormEl().formSignInFailureIconEmail.style.opacity = '1';
    }
  }

  if (data.code === 400 && data.message === 'Field email must be a valid email') {
    refsFormEl().formSignInInputEmail.classList.add('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationEmail.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignInErrorNotificationEmail.textContent =
        'Невалидный адрес электронной почты';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignInErrorNotificationEmail.textContent =
        'Field "email" must be a valid email';
    }

    refsFormEl().formSignInFailureIconEmail.style.opacity = '1';
  }

  /**
   * pass
   **/
  if (
    data.code === 400 &&
    data.message === 'Field password is not allowed to be empty' &&
    refsFormEl().formSignInInputPassword.value === ''
  ) {
    refsFormEl().formSignInInputPassword.classList.add('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationPassword.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignInErrorNotificationPassword.textContent =
        'Поле "пароль" не может быть пустым';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignInErrorNotificationPassword.textContent =
        'Field "password" is not allowed to be empty';
    }

    refsFormEl().formSignInFailureIconPassword.style.opacity = '1';
  }

  if (
    data.code === 401 &&
    data.message === 'Invalid credentials' &&
    refsFormEl().formSignInInputPassword
  ) {
    refsFormEl().formSignInInputPassword.classList.add('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationPassword.classList.add('error-visible');

    if (apiService._lang === 'ru-RU') {
      refsFormEl().formSignInErrorNotificationPassword.textContent = 'Данные недействительны';
    } else if (apiService._lang === 'en-US') {
      refsFormEl().formSignInErrorNotificationPassword.textContent = 'Invalid credentials';
    }
    refsFormEl().formSignInFailureIconPassword.style.opacity = '1';
  }

  /**
   * success
   **/
  if (data.code === 200 && data.status === 'success') {
    refsFormEl().formSignInInputEmail.classList.remove('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationEmail.classList.remove('error-visible');
    refsFormEl().formSignInInputEmail.classList.add('form-sign__input--success');
    refsFormEl().formSignInErrorNotificationEmail.textContent = '';
    refsFormEl().formSignInFailureIconEmail.style.opacity = '0';
    refsFormEl().formSignInSuccessIconEmail.style.opacity = '1';

    refsFormEl().formSignInInputPassword.classList.remove('form-sign__input--error');
    refsFormEl().formSignInErrorNotificationPassword.classList.remove('error-visible');
    refsFormEl().formSignInInputPassword.classList.add('form-sign__input--success');
    refsFormEl().formSignInErrorNotificationPassword.textContent = '';
    refsFormEl().formSignInFailureIconPassword.style.opacity = '0';
    refsFormEl().formSignInSuccessIconPassword.style.opacity = '1';
  }
}

export function refsFormEl() {
  return {
    /**
     * Sign-Up
     **/

    //username
    formSignUpInputName: document.querySelector('.form-sign-up__input-username'),
    formSignUpFailureIconName: document.querySelector('.signup-failure-icon-name'),
    formSignUpSuccessIconName: document.querySelector('.signup-success-icon-name'),
    formSignUpErrorNotificationName: document.querySelector('.signup-error-name'),

    //email
    formSignUpInputEmail: document.querySelector('.form-sign-up__input-email'),
    formSignUpFailureIconEmail: document.querySelector('.signup-failure-icon-email'),
    formSignUpSuccessIconEmail: document.querySelector('.signup-success-icon-email'),
    formSignUpErrorNotificationEmail: document.querySelector('.signup-error-email'),

    //password
    formSignUpInputPassword: document.querySelector('.form-sign-up__input-password'),
    formSignUpFailureIconPassword: document.querySelector('.signup-failure-icon-password'),
    formSignUpSuccessIconPassword: document.querySelector('.signup-success-icon-password'),
    formSignUpErrorNotificationPassword: document.querySelector('.signup-error-password'),

    /**
     * Sign-In
     **/

    //email
    formSignInInputEmail: document.querySelector('.form-sign-in__input-email'),
    formSignInFailureIconEmail: document.querySelector('.signin-failure-icon-email'),
    formSignInSuccessIconEmail: document.querySelector('.signin-success-icon-email'),
    formSignInErrorNotificationEmail: document.querySelector('.signin-error-email'),

    //password
    formSignInInputPassword: document.querySelector('.form-sign-in__input-password'),
    formSignInFailureIconPassword: document.querySelector('.signin-failure-icon-password'),
    formSignInSuccessIconPassword: document.querySelector('.signin-success-icon-password'),
    formSignInErrorNotificationPassword: document.querySelector('.signin-error-password'),
  };
}

export function clearStylesSignUpForm() {
  //username
  refsFormEl().formSignUpInputName.classList.remove('form-sign__input--success');
  refsFormEl().formSignUpInputName.classList.remove('form-sign__input--error');
  refsFormEl().formSignUpErrorNotificationName.classList.remove('error-visible');
  refsFormEl().formSignUpErrorNotificationName.classList.add('error-hidden');

  refsFormEl().formSignUpSuccessIconName.style.opacity = '0';
  refsFormEl().formSignUpFailureIconName.style.opacity = '0';

  //email
  refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--success');
  refsFormEl().formSignUpInputEmail.classList.remove('form-sign__input--error');
  refsFormEl().formSignUpErrorNotificationEmail.classList.remove('error-visible');
  refsFormEl().formSignUpErrorNotificationEmail.classList.add('error-hidden');

  refsFormEl().formSignUpFailureIconEmail.style.opacity = '0';
  refsFormEl().formSignUpSuccessIconEmail.style.opacity = '0';

  //password
  refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--success');
  refsFormEl().formSignUpInputPassword.classList.remove('form-sign__input--error');
  refsFormEl().formSignUpErrorNotificationPassword.classList.remove('error-visible');
  refsFormEl().formSignUpErrorNotificationPassword.classList.add('error-hidden');

  refsFormEl().formSignUpFailureIconPassword.style.opacity = '0';
  refsFormEl().formSignUpSuccessIconPassword.style.opacity = '0';
}

export function clearStylesSignInForm() {
  //email
  refsFormEl().formSignInInputEmail.classList.remove('form-sign__input--error');
  refsFormEl().formSignInErrorNotificationEmail.classList.remove('error-visible');
  refsFormEl().formSignInErrorNotificationEmail.classList.add('error-hidden');

  refsFormEl().formSignInFailureIconEmail.style.opacity = '0';
  refsFormEl().formSignInSuccessIconEmail.style.opacity = '0';

  //password
  refsFormEl().formSignInInputPassword.classList.remove('form-sign__input--error');
  refsFormEl().formSignInErrorNotificationPassword.classList.remove('error-visible');
  refsFormEl().formSignInErrorNotificationPassword.classList.add('error-hidden');

  refsFormEl().formSignInFailureIconPassword.style.opacity = '0';
  refsFormEl().formSignInSuccessIconEmail.style.opacity = '0';
}
