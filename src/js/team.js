import refs from './refs';
import teamList from './teamList';
import teamTpl from "../templates/team.hbs";

refs.openTeamModalBtn.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
  evt.preventDefault();

  renderTeam(teamList);
  window.addEventListener('keydown', onEscKeyPress);
  refs.closeTeamModalBtn.addEventListener('click', onCloseModal);
  refs.backdropTeamModal.addEventListener('click', onBackdropClick);
  refs.body.classList.add('popup-open');
  refs.body.classList.add('show-modal');
}

function renderTeam() {
  const markup = teamTpl(teamList);
  refs.teamContainer.innerHTML = markup;
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
  document.body.classList.remove('popup-open');
  refs.closeTeamModalBtn.removeEventListener('click', onCloseModal);
  refs.backdropTeamModal.removeEventListener('click', onBackdropClick);
  refs.teamContainer.innerHTML = "";
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
