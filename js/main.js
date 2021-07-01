const header = document.querySelector("header");
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll("nav a");
const nav = document.querySelector("nav");


// Handle navbar background transparency

const navTransparencyOptions = {
    root: null, // defaults to viewport
    threshold: 0.85
}

const headerObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting || navMenu.classList.contains("active")) {
            nav.classList.add("opaque");
            return
        }
        nav.classList.remove("opaque");
    })
}

const headerObserver = new IntersectionObserver(headerObserverCallback, navTransparencyOptions);

headerObserver.observe(header);


// Handle menu toggle

const handleMenuToggle = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    // if menu is expanded, remove transparencies
    if (navMenu.classList.contains("active")) {
        nav.classList.add("opaque");
    } else if (window.scrollY === 0) {
        nav.classList.remove("opaque");
    }
}

const handleOutsideNavClick = (ev) => {
    if (!nav.contains(ev.target) && navMenu.classList.contains("active")) {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        if (window.scrollY === 0) {
            nav.classList.remove("opaque");
        }
    }
}

hamburger.addEventListener("click", handleMenuToggle);
navLinks.forEach(link => link.addEventListener("click", handleMenuToggle));
document.addEventListener("click", handleOutsideNavClick);


// Handle project slide-ins

const projects = document.querySelectorAll(".project-container");

const projectObserverOptions = {
    root: null,
    rootMargin: "-45% 0%",
    threshold: 0
}

const projectObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }
        entry.target.classList.add("show");
    })
}

const projectObserver = new IntersectionObserver(projectObserverCallback, projectObserverOptions);

projects.forEach(project => projectObserver.observe(project));