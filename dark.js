// تحميل الحالة المحفوظة
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

// تبديل الوضع
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

