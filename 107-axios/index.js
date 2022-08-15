// import axios from 'axios';

// const httpClient = axios.create({
//   baseURL: 'http://localhost:3000/api',
// });

function fetchMovies() {
  axios.get('https://www.omdbapi.com/?apikey=7035c60c&s=frozen').then((res) => {
    console.log(res);

    const headingEl = document.querySelector('h1');
    const imgEl = document.querySelector('img');
    headingEl.textContent = res.data.Search[0].Title;
    imgEl.src = res.data.Search[0].Poster;
  });
}

fetchMovies();
