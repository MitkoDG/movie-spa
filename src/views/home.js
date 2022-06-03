import { getMovies } from '../services/api.js';
import { showView, spinner } from '../util.js';
import { detailsPage } from './details.js';

const section = document.getElementById('home-page');
const catalog = document.querySelector('#movie .card-deck.d-flex.justify-content-center');

catalog.addEventListener('click', (event)=>{
    if (event.target.tagName == 'BUTTON') {
        event.preventDefault();
        const id = event.target.dataset.id
        detailsPage(id);
    }
});

export function homePage() {
    showView(section);
    displayMovies();
};

async function displayMovies() {
    catalog.replaceChildren(spinner());

    const movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview))
};

function createMoviePreview(movie) {
    const element = document.createElement('div');
    element.className = 'movie-card';
    element.innerHTML = `
    <img class="card-img-top" src="${movie.posterUrl}" alt="Card image cap" width="400">
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
