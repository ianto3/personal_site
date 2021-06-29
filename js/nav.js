// Handle menu toggle

const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");

const handleMenuToggle = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

const handleOutsideNavClick = (ev) => {
    if (!nav.contains(ev.target) && navMenu.classList.contains("active")) {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
}

hamburger.addEventListener("click", handleMenuToggle);
navLinks.forEach(link => link.addEventListener("click", handleMenuToggle));
document.addEventListener("click", handleOutsideNavClick);


// Handle navbar background transparency

const debounce = (callback, delay) => {
    let timeout = null
    return (...args) => {
        const next = () =>
            callback(...args);
        clearTimeout(timeout);
        timeout = setTimeout(next, delay);
    }
}

const navTransparency = () => {
    if (window.scrollY > 0) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", debounce(navTransparency, 100));
