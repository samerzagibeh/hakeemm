// =================================
// Hakim Landing Page
// =================================
console.log("JS Connected");
document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Hero Fade In
    // ==========================

    document.body.classList.add("loaded");


    // ==========================
    // Typing Effect
    // ==========================

    const title = document.querySelector(".hero h1");

    if(title){

        const originalText = title.textContent;

        title.textContent = "";

        let i = 0;

        function typeWriter(){

            if(i < originalText.length){

                title.textContent += originalText.charAt(i);

                i++;

                setTimeout(typeWriter, 60);

            }

        }

        typeWriter();

    }


    // ==========================
    // Reveal on Scroll
    // ==========================

    const reveals = document.querySelectorAll(".card,.stats div");

    function revealElements(){

        reveals.forEach(item=>{

            const top = item.getBoundingClientRect().top;

            if(top < window.innerHeight - 100){

                item.classList.add("show");

            }

        });

    }

    revealElements();

    window.addEventListener("scroll", revealElements);


    // ==========================
    // Counter Animation
    // ==========================

   // ==========================
// Counter Animation
// ==========================

const counters = document.querySelectorAll(".counter");

let started = false;

function startCounters() {

    if (started) return;

    started = true;

    counters.forEach(counter => {

        const target = parseInt(counter.dataset.target);

        let count = 0;

        const increment = target / 100;

        const updateCounter = () => {

            count += increment;

            if (count < target) {

                counter.textContent = Math.floor(count);

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target + "+";

            }

        };

        updateCounter();

    });

}

const statsSection = document.querySelector("#stats");

function checkStats() {
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        startCounters();
        window.removeEventListener("scroll", checkStats);
    }
}

window.addEventListener("scroll", checkStats);
checkStats();
    // ==========================
    // Button Ripple Effect
    // ==========================

    const buttons = document.querySelectorAll(".start-btn,.login-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            const circle = document.createElement("span");

            const diameter = Math.max(
                button.clientWidth,
                button.clientHeight
            );

            circle.style.width = diameter + "px";
            circle.style.height = diameter + "px";

            circle.style.position = "absolute";
            circle.style.borderRadius = "50%";
            circle.style.background = "rgba(255,255,255,.4)";
            circle.style.transform = "scale(0)";
            circle.style.animation = "ripple .6s linear";

            const rect = button.getBoundingClientRect();

            circle.style.left =
                e.clientX - rect.left - diameter/2 + "px";

            circle.style.top =
                e.clientY - rect.top - diameter/2 + "px";

            const oldRipple =
                button.querySelector(".ripple");

            if(oldRipple){

                oldRipple.remove();

            }

            circle.classList.add("ripple");

            button.appendChild(circle);

        });

    });


    // ==========================
    // Parallax Image
    // ==========================

    const heroImage =
        document.querySelector(".hero-image img");

    document.addEventListener("mousemove",(e)=>{

        if(!heroImage) return;

        const x =
            (window.innerWidth/2 - e.clientX)/40;

        const y =
            (window.innerHeight/2 - e.clientY)/40;

        heroImage.style.transform =
            `translate(${x}px,${y}px)`;

    });


    // ==========================
    // Header Scroll Effect
    // ==========================

    const header =
        document.querySelector("header");

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 50){

            header.style.padding = "12px 8%";

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.08)";

        }else{

            header.style.padding = "18px 8%";

            header.style.boxShadow =
                "0 4px 20px rgba(0,0,0,.05)";

        }

    });


    // ==========================
    // Floating Cards
    // ==========================

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.animate(

            [
                {
                    transform:"translateY(0px)"
                },
                {
                    transform:"translateY(-10px)"
                },
                {
                    transform:"translateY(0px)"
                }
            ],

            {
                duration:3000 + index * 500,
                iterations:Infinity
            }

        );

    });


    // ==========================
    // Smooth Scroll
    // ==========================

    document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });


    // ==========================
    // Mouse Glow Effect
    // ==========================

    const glow =
        document.createElement("div");

    glow.className = "mouse-glow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove",(e)=>{

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

});
console.log("JS Finished");