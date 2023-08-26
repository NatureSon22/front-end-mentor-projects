const sideMenuButton = document.querySelector('.hamburger');
const exitMenuButton = document.querySelector('nav img');
const divEffect = document.querySelector('.side-effect');
const sideBar = document.querySelector('aside nav');

const toggleClassActive = () => {
    divEffect.classList.toggle('active');
    sideBar.classList.toggle('active');
    sideMenuButton.classList.toggle('active');
    console.log('this')
}

sideMenuButton.addEventListener('click', toggleClassActive);
exitMenuButton.addEventListener('click', toggleClassActive)

