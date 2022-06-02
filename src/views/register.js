import { showView, updateNav } from '../util.js';
import { homePage } from './home.js';

const herokuAuth = 'http://ddg-server.herokuapp.com/users/register'

const section = document.querySelector('#form-sign-up');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function registerPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('repeatPassword'); // TODO verification

    await register(email, password);
    form.reset();
    updateNav();
    homePage();
};

async function register(email, password) {
    try {
        const res = await fetch(herokuAuth,{
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