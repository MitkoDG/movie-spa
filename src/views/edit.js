import { showView } from "../util.js";

const section = document.querySelector('#edit-movie');
const form = section.querySelector('form');
form.addEventListener(' ', editData)
let movieId;
export function editPage(e, movie) {
    e.preventDefault();
    movieId = movie._id;
    showView(section);
    loadFormData(movie)
};

function loadFormData(movie) {
    console.log(movie);
    const formData = new FormData(form);
    
    formData.set('title', movie.title);
    formData.set('description', movie.description);
    formData.set('imageUrl', movie.posterUrl);
};

async function editData(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('imageUrl');
    console.log('Edit function hasn`t been finished yet');
    await patchMovie(title, description, img, movieId);
    form.reset();
    detailsPage(movieId);
};

