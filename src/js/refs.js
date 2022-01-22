const refs = {
  hederContainerRef: document.querySelector('header .container'),
  contentRef: document.querySelector('.content'),
  footerContainerRef: document.querySelector('.footer .container'),
  modalRef: document.querySelector('.backdrop'),
  bodyRef: document.querySelector('body'),
  htmlRef: document.querySelector('html'),
  paginationContainerRef: document.querySelector('.tui-pagination'),
  libraryPaginationContainerRef: document.querySelector('#pagination-container'),
  loaderRef: document.querySelector('.loader-box'),
};
export function getRefs() {
  return {
    home_btn_ref: document.querySelector('.header-home-btn'),
    my_library_btn_ref: document.querySelector('.header-library-btn'),
    search_films_ref: document.querySelector('.header-form__input'),
    watched_library_btn_ref: document.querySelector('.header-control__watched'),
    queue_library_btn_ref: document.querySelector('.header-control__queue'),
    vote_ref: document.querySelector('.movie-info__list-vote'),
    popularity_ref: document.querySelector('.movie-info__list-popularity'),
    original_title_ref: document.querySelector('.movie-info__list-title'),
    genre_ref: document.querySelector('.movie-info__list-genre'),
    about_ref: document.querySelector('.movie-about__title'),
    add_watched_btn_ref: document.querySelector('.movie-btn--watched'),
    add_queue_btn_ref: document.querySelector('.movie-btn--queue'),
    copyright_ref: document.querySelector('.footer-copyright__text'),
    developer_ref: document.querySelector('.footer-developer'),
    developer_by_ref: document.querySelector('.footer-developer__by'),
    control_sign_up_ref: document.querySelector('.control-sign-up'),
    control_sign_in_ref: document.querySelector('.control-sign-in'),
    form_sign_up_field_username_ref: document.querySelector('.form-sign-up__field-username'),
    form_sign_up_input_username_ref: document.querySelector('.form-sign-up__input-username'),
    form_sign_up_field_email_ref: document.querySelector('.form-sign-up__field-email'),
    form_sign_up_input_email_ref: document.querySelector('.form-sign-up__input-email'),
    form_sign_up_field_password_ref: document.querySelector('.form-sign-up__field-password'),
    form_sign_up_input_password_ref: document.querySelector('.form-sign-up__input-password'),
    submit_btn_sign_up_ref: document.querySelector('.submit-btn-sign-up'),
    form_sign_in_field_email_ref: document.querySelector('.form-sign-in__field-email'),
    form_sign_in_input_email_ref: document.querySelector('.form-sign-in__input-email'),
    form_sign_in_field_password_ref: document.querySelector('.form-sign-in__field-password'),
    form_sign_in_input_password_ref: document.querySelector('.form-sign-in__input-password'),
    submit_btn_sign_in_ref: document.querySelector('.submit-btn-sign-in'),
    welcome_in_library_ref: document.querySelector('.welcome-in-library'),
    team_content__text_ref: document.querySelector('.team-content__text'),
    team_content__title_ref: document.querySelector('.team-content__title'),
  };
}

export default refs;
