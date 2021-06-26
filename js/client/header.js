const closedicon = document.getElementById("headi");

const burger = document.getElementById('tog');
//const navLinks = document.querySelector('.nav-links');

const closeheader = document.getElementById("closehead");

burger.addEventListener('click', () => {
    closedicon.style.display = "block";
    //navLinks.classList.toggle('active');
});

closeheader.addEventListener('click', () => {
    closedicon.style.display = "none";
    //navLinks.classList.toggle('active');
});