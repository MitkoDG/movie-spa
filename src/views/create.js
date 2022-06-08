import { homePage } from './home.js';
import { showView } from '../util.js';
import { createMovie } from '../services/api.js';



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
    await createMovie(title, description, img);
    form.reset();
    homePage();
}

