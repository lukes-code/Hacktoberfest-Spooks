// responsive menu
const hamburgerButtonElement = document.querySelector('#button-hamburger');
const drawerElement = document.querySelector('.topnav');
const bodyElement = document.querySelector('body');
hamburgerButtonElement.addEventListener('click', (event) => {
    drawerElement.classList.toggle('open');
    event.stopPropagation();
});
bodyElement.addEventListener('click', (event) => {
    drawerElement.classList.remove('open');
    event.stopPropagation();
});