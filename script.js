console.log("portfolio loaded successfully!");

const navlinks=document.querySelectorAll("nav a");

navlinks.forEach(function(link) {

link.addEventListener("click",function(){

      console.log("Navigation clicked:",link.textContent);

});

});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", function(){
    nav.classList.toggle("show-menu");

});

navlinks.forEach(function(link){
    link.addEventListener("click", function(){
        nav.classList.remove("show-menu")
    });
});

const section = document.querySelectorAll("section");

window.addEventListener("scroll", function() {

    let current ="";

    section.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navlinks.forEach(function(link) {
        link.classList.remove("active");

        if (link.getAttribute("href")==="#" + current){
            link.classList.add("active");
        }
    });
});

const carousel = document.querySelector(".skills-carousel");

if (carousel) {
    const pills = carousel.querySelectorAll(".skill-pill");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let angle = 0;
    let paused = false;
    let last = performance.now();

    const SPEED = 0.35;   // radians per second, kam = dheere
    const DEPTH_Y = 45;   // oval kitna chaudha dikhe (upar-neeche)

    function place() {
        const rx = Math.min(carousel.clientWidth * 0.36, 360);

        pills.forEach(function(pill, i) {
            const a = angle + (i * 2 * Math.PI) / pills.length;
            const depth = (Math.sin(a) + 1) / 2;       // 0 = peeche, 1 = aage

            const x = Math.cos(a) * rx;
            const y = Math.sin(a) * DEPTH_Y;
            const scale = 0.6 + 0.4 * depth;

            pill.style.transform =
                "translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(" + scale + ")";
            pill.style.opacity = 0.35 + 0.65 * depth;
            pill.style.zIndex = Math.round(depth * 100);
        });
    }

    function tick(now) {
        const dt = (now - last) / 1000;
        last = now;
        if (!paused) angle += SPEED * dt;
        place();
        requestAnimationFrame(tick);
    }

    carousel.addEventListener("mouseenter", function() { paused = true; });
    carousel.addEventListener("mouseleave", function() { paused = false; });

    place();
    if (!reduceMotion) requestAnimationFrame(tick);
}