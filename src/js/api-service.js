import storage from "./storage";

const API_KEY = '6914e86918040074e2fe382ba8e8cb5e';
const BASE_URL = 'https://api.themoviedb.org/3/';
const GENRES = "genres";

export default class FilmsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchFilms(url, numberOfPage = 0) {
    if (numberOfPage === 0) {
      return fetch(
        `${BASE_URL}${url}?api_key=${API_KEY}&page=${this.page}&query=${this.searchQuery}`,
      )
        .then(response => response.json())
        .then(({ results, total_pages }) => {
          this.incrementPage();
          return { results, total_pages };
        });
    } else {
      return fetch(
        `${BASE_URL}${url}?api_key=${API_KEY}&page=${numberOfPage}&query=${this.searchQuery}`,
      )
        .then(response => response.json())
        .then(({ results, total_pages }) => {
          this.incrementPage();
          return { results, total_pages };
        });
    }
  }

  fetchGenres() {
    return fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const genres = {};
        data.genres.forEach(el => {
          genres[`${el.id}`] = el.name;
        });
        storage.save(GENRES, genres);
      });
  }

  showFilmsResult(url, numberOfPage) {
    const genresList = storage.load(GENRES) || this.fetchGenres();
   
  return this.fetchFilms(url, numberOfPage).then(data => {
    const total_pages = data.total_pages;
    const superResults = data.map(el => 
     el.release_date
        ? {
          ...el,
          genre_ids: el.genre_ids.map(id => genresList[id]),
          release_date: el.release_date.split('-')[0],
          vote_average: el.vote_average.toFixed(1),
        }
        : {
          ...el,
          genre_ids: el.genre_ids.map(id => genresList[id]),
          release_date: 'Unknown',
          vote_average: el.vote_average.toFixed(1),       
    }
      )
    return { total_pages, superResults };
  }
    );
  };

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  singleRequest(id) {
    return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`).then(response =>
      response.json(),
    );
  }
}
