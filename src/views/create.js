import { homePage } from './home.js';
import { showView } from '../util.js';

const herokuMovies = 'http://ddg-server.herokuapp.com/data/movies'

const section = document.querySelector('#add-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');
    console.log(img);
    await createMovie(title, description, img);
    form.reset();
    homePage();
}

async function createMovie(title, description, posterUrl) {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch(herokuMovies, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ title, description, posterUrl })
    });
}