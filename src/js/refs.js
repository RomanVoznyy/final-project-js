const refs = {
  body: document.querySelector('body'),
  main: document.querySelector('main'),
  moviesContainer: document.querySelector('.js-film-container'),
  searchForm: document.querySelector('#search-form'),
  watchedBtn: document.querySelector('.watched-btn'),
  queueBtn: document.querySelector('.queue-btn'),
  notification: document.querySelector('.notification'),
  paginationEl: document.querySelector('ul.pagination'),

  popup: document.querySelector('.js-popup'),
  movieField: document.querySelector('.popup-movie'),
  btnClose: document.querySelector('.js-close'),

  teamContainer: document.querySelector('.team-members'),
  openTeamModalBtn: document.querySelector('.js-open-modal'),
  closeTeamModalBtn: document.querySelector('.js-team-close'),
  backdropTeamModal: document.querySelector('.js-backdrop'),
};

export default refs;
