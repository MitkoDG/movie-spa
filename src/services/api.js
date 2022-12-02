
const herokuMoviesList = 'https://ddg-server.cyclic.app/data/movies'
const herokuMovieDelete = 'https://ddg-server.cyclic.app/data/movies/'
const herokuRegister = 'https://ddg-server.cyclic.app/users/register'

export async function getMovies() {
    const responce = await fetch(herokuMoviesList);
    const data = await responce.json();

    return data;
};

export async function getMovie(id) {
    const urlForFetch = `https://ddg-server.cyclic.app/data/movies/${id}`
    const res = await fetch(urlForFetch);
    const movie = await res.json();

    return movie;
}

export async function getLikes(id) {
    const res = await fetch(`https://ddg-server.cyclic.app/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();

    return likes;
}

export async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id;
        const res = await fetch(`https://ddg-server.cyclic.app/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const like = await res.json();

        return like.length > 0;
    }
}

export async function createMovie(title, description, posterUrl) {
    const user = JSON.parse(localStorage.getItem('user'));
    await fetch(herokuMoviesList, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ title, description, posterUrl })
    });
}

export async function register(email, password) {
    try {
        const res = await fetch(herokuRegister, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message)
        };
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        alert(err.message)
        throw err;
    }
}

export async function delMovie(event, user, movieId) {
    fetch(`${herokuMovieDelete}${movieId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
    })
}

export async function patchMovie(title, description, img, movieId) {
    const user = JSON.parse(localStorage.getItem('user'));

    await fetch(`${herokuMovieDelete}${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({ title, description, posterUrl: img })
    });
}
