
const herokuMoviesList = 'https://ddg-server.herokuapp.com/data/movies/'

export async function getMovies() {
    const responce = await fetch(herokuMoviesList);
    const data = await responce.json();

    return data;
};

