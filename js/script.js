// Create Simple router
// Fetch data for individual movie by ID
//

const global = {
  currentPage: window.location.pathname,
};

//Display movie details
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  console.log(movieID); //'?id=565770'

  const movie = await movieFetchAPI(`movie/${movieID}`);

  const div = document.createElement('div');

  document.querySelector('#movie-details').appendChild(div);
}

//Fetch Data From TMDB API + display movies
async function movieFetchAPI(endpoint) {
  const API_KEY = '45c41cb96c4d1498cd76590887b34078';
  const API_URL = 'https://api.themoviedb.org/3';

  showSpinner();

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  hideSpinner();
  return data;
}

//show spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

//Hide Spinner
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

//Highlight Active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//popular movie display
async function displayPopularMovies() {
  const { results } = await movieFetchAPI('movie/popular');

  results.forEach((movie) => {
    console.log(movie);
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
    ${
      movie.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
    class="card-img-top"
    alt= "${movie.title}"
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt= "Movie Title"
/>`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
  </div>`;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Popular TV Show display
async function displayPopularTvShows() {
  const { results } = await movieFetchAPI('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `<a href="tv-details.html?id=${show.id}">
    ${
      show.poster_path
        ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt= "${show.name}show.name
  />`
        : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt= "Movie Title"
/>`
    }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${show.first_air_date}</small>
    </p>
  </div>`;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;

    case '/shows.html':
      displayPopularTvShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('Tv details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
