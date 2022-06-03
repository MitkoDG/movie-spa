
const herokuMoviesList = 'https://ddg-server.herokuapp.com/data/movies'
const herokuRegister = 'https://ddg-server.herokuapp.com/users/register'


export async function getMovies() {
    const responce = await fetch(herokuMoviesList);
    const data = await responce.json();

    return data;
};

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
        const res = await fetch(herokuRegister,{
            method: 'POST',
            headers:{
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
        localStorage.setItem('user',JSON.stringify(user));
    } catch (err) {
        alert(err.message)
        throw err;
    }
}
