
// menue bar
let menu = document.querySelector("#menue-icon");
let navbar = document.querySelector(".Navbar");



menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}


