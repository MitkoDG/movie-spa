import { getMovies } from '../services/api.js';

const section = document.getElementById('home-page');
const catalog = document.querySelector('#movie .card-deck.d-flex.justify-content-center');

export function homePage() {

    displayMovies();
};

async function displayMovies() {

    const movies = await getMovies();

    catalog.replaceChildren(...movies.map(createMoviePreview))
};

function createMoviePreview(movie) {
    const element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a href="/details/${movie._id}">
            <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
        </a>
    </div>`;

    return element;
}