const body = document.body;
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
};

navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
        navToggle.focus();
    }
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const revealTargets = document.querySelectorAll(
    ".section__heading, .profile-copy, .case-card, .adventure-card, .timeline__item, .skills-grid article, .education-list article, .project-panel, .project-document, .contact__actions"
);

if (
    revealTargets.length &&
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    revealTargets.forEach((target) => {
        target.dataset.reveal = "true";
        revealObserver.observe(target);
    });

    document.documentElement.classList.add("has-reveal");
}
