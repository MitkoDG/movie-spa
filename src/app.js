import { updateNav } from "./util.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const routes = {
    '/': homePage,
    '/login': loginPage,
    '/logout': logout,
    '/create': createPage,
    '/register': registerPage,
    '/edit': editPage,
};

document.querySelector('nav').addEventListener('click', onNavigate);
document.querySelector('#add-movie-button a').addEventListener('click', onNavigate);
document.querySelector('#movie').addEventListener('click', onNavigate);




function onNavigate(event) {

    if (event.target.tagName == 'A' && event.target.href ) {
        event.preventDefault();

        const url = new URL(event.target.href);
        const view = routes[url.pathname];

        if (typeof view == 'function') {
            view();
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    alert('Successful logout');
    updateNav();
}

updateNav();
homePage();