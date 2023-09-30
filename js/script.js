const global = {
  currentPage: window.location.pathname,
};

//Init App
function init() {
  switch (global.currentPage) {
    case '/':
      console.log('Home');
      break;

    case '/shows.html':
      console.log('Tv Shows');
      break;
    case '/movie-details.html':
      console.log('Movies details');
      break;
    case '/tv-details.html':
      console.log('Tv details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
