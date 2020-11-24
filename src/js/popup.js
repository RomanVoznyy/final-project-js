import popupMovieTpl from '../templates/popup-movie.hbs';
import FilmsApiService from './api-service.js';
import refs from './refs';
import { onModalButtons, clearListener } from './lists-add-servises';
import loaderToggle from './loader';

const filmsApiService = new FilmsApiService();

export function startPopup(id) {
  loaderToggle();
  const filmDataPromises = [];

  filmDataPromises.push(filmsApiService.singleRequest(id));
  filmDataPromises.push(filmsApiService.singleVideoRequest(id));

  Promise.all(filmDataPromises).then(renderPage).then(loaderToggle).catch(error => console.log(error));

  refs.body.classList.add('popup-open');
  refs.popup.classList.add('is-open');
  refs.popup.addEventListener('click', onBackdropClick);
  refs.btnClose.addEventListener('click', closePopup);
  window.addEventListener('keyup', closePopup);
}

function renderPage(film) {
  const markup = popupMovieTpl(createOneObject(film));
  refs.movieField.innerHTML = markup;
  checkMarkup();
  onModalButtons();
}

function createOneObject(film) {
  film[0].videoKey = film[1].results.length ? film[1].results[0].key : false;
  return film[0];
}

function closePopup({ type, key }) {
  const clearPopup = () => {
    refs.body.classList.remove('popup-open');
    refs.popup.classList.remove('is-open');
    refs.popup.removeEventListener('click', closePopup);
    refs.btnClose.removeEventListener('click', closePopup);
    window.removeEventListener('keyup', closePopup);
    refs.movieField.innerHTML = '';
    clearListener();
  };

  if (type === 'keyup') {
    if (key === 'Escape') {
      clearPopup();
    }
  } else {
    clearPopup();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closePopup(event);
  }
}

function checkMarkup() {
  const avVote = document.querySelector('.vote-average');
  const avVoteValue = avVote.textContent;

  if (!avVoteValue.includes('.')) {
    avVote.textContent = avVoteValue.concat('.0');
  }
}
