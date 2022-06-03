import { register } from '../services/api.js';
import { showView, updateNav } from '../util.js';
import { homePage } from './home.js';

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
    const rePassword = formData.get('repeatPassword');


    if (!email || !password || !rePassword) {
        alert("All fields are required!");
    }
    else if (password !== rePassword) {
        alert("Repeat the password properly");
    }
    else {
        await register(email, password);
        form.reset();
        updateNav();
        homePage();
    }
};

