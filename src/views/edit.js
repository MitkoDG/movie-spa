import { showView } from "../util.js";
import { detailsPage } from "./details.js";
import { patchMovie } from "../services/api.js";

const section = document.querySelector('#edit-movie');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

let movieId;
export function editPage(e, movie) {
    e.preventDefault();
    movieId = movie._id;
    showView(section);
    loadFormData(movie)
};

function loadFormData(movie) {
    let title = form.querySelector('#title')
    title.value = movie.title
    let description = form.querySelector('#description')
    description.value = movie.description
    let img = form.querySelector('#imageUrl')
    img.value = movie.posterUrl
};

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');

    await patchMovie(title, description, img, movieId);
    form.reset();
    detailsPage(movieId);
};

