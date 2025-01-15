const toggleButton = document.getElementById('navbar-toggle');
const navbarLinks = document.getElementById('navbar-links');
const navbar = document.querySelector('.navbar');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
    navbar.classList.toggle('navbar-expanded');
});
