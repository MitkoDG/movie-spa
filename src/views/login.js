import { homePage } from './home.js';
import { showView, updateNav } from '../util.js';

const herokuAuth = 'https://ddg-server.cyclic.app/users/login'

const section = document.querySelector('#form-login');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    showView(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        alert("All fields are required!");
    }
    else if (password < 6) {
        alert("Password should be at least 6 character long !");
    }
    else {
        await login(email, password);
        form.reset();
        updateNav();
        homePage();
    }
}

async function login(email, password) {
    try {
        const res = await fetch(herokuAuth || 'http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        alert(err.message);
        throw err;
    }
}