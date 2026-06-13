// عدادات الإحصائيات

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.dataset.target;
        const current = +counter.innerText;

        const increment = target / 50;

        if(current < target){

            counter.innerText =
            Math.ceil(current + increment);

            setTimeout(updateCounter,30);

        }else{

            counter.innerText = target;
        }
    };

    updateCounter();
});


// زر استكشف الخدمات

document.getElementById("exploreBtn")
.addEventListener("click", () => {

    document.getElementById("services")
    .scrollIntoView({
        behavior:"smooth"
    });

});


// ظهور الكروت عند النزول

const cards =
document.querySelectorAll(".wa3i-card");

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");
        }

    });

});

cards.forEach(card => {
    observer.observe(card);
});