const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll("nav a");
const nav = document.querySelector("nav");

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
    if (window.scrollY > 0 || navMenu.classList.contains("active")) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", debounce(navTransparency, 100));

// Handle menu toggle

const handleMenuToggle = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    // if menu is expanded, remove transparencies
    if (navMenu.classList.contains("active")) {
        nav.classList.add("scrolled");
    } else {
        navTransparency();
    }
}

const handleOutsideNavClick = (ev) => {
    if (!nav.contains(ev.target) && navMenu.classList.contains("active")) {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        navTransparency();
    }
}

hamburger.addEventListener("click", handleMenuToggle);
navLinks.forEach(link => link.addEventListener("click", handleMenuToggle));
document.addEventListener("click", handleOutsideNavClick);