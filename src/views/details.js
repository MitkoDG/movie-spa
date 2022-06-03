import { showView, spinner } from '../util.js';

const herokuMoviesLikes = 'https://ddg-server.herokuapp.com/data/likes/'

const section = document.querySelector('#movie-example');

export function detailsPage(id) {
    showView(section);
    displayMovie(id);
};

async function displayMovie(id) {
    section.replaceChildren(spinner());

    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);

    section.replaceChildren(createMovieCard(movie, user, likes, ownLike));
}

function createMovieCard(movie, user, likes, ownLike) {
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.posterUrl}" alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${createControls(movie, user, ownLike)}
            <span class="enrolled-span">Liked ${likes}</span>
        </div>
    </div>`;

    const likeBtn = element.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    } 
    
    const editBtn = element.querySelector('.btn-warning');
    if (editBtn) {
        editBtn.addEventListener('click', (e) => console.log('TODO: edit option'));
    } 

    const deleteBtn = element.querySelector('.btn-danger');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => console.log('TODO: delete option'));
    } 

    return element;
}

function createControls(movie, user, ownLike) {
    const isOwner = user && user._id == movie._ownerId;

    let controls = [];

    if (isOwner) {
        controls.push('<a class="btn btn-danger" href="#">Delete</a>');
        controls.push('<a class="btn btn-warning" href="#">Edit</a>');
    } else if (user && ownLike == false) {
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }
    controls.push();

    return controls.join('');
}

async function getMovie(id) {
    const urlForFetch = `https://ddg-server.herokuapp.com/data/movies/${id}`
    const res = await fetch(urlForFetch);
    const movie = await res.json();

    return movie;
}

async function getLikes(id) {
    const res = await fetch(`https://ddg-server.herokuapp.com/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const res = await fetch(`https://ddg-server.herokuapp.com/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}

async function likeMovie(e, movieId) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch(herokuMoviesLikes, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    detailsPage(movieId);
}