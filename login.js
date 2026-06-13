async function login() {

    const username = document.getElementById("username");
    const password = document.getElementById("password");

    try {

        const res = await fetch("https://hakeemm-7.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        const data = await res.json();

        if (data.success) {
            window.location.href = "home.html";
        } else {
            alert(data.message || "فشل تسجيل الدخول");
        }

    } catch (err) {
        alert("خطأ بالسيرفر");
        console.log(err);
    }
}
async function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const btn = document.getElementById("loginBtn");
    const loader = document.getElementById("loader");
    const text = document.getElementById("btnText");

    // 🔵 show loading
    btn.disabled = true;
    loader.style.display = "inline-block";
    text.style.opacity = "0.6";

    try {
        const response = await fetch("https://hakeemm-7.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if(data.success){
            window.location.href = "home.html";
        } else {
            alert(data.message || "فشل تسجيل الدخول");
        }

    } catch (error) {
        console.log(error);
        alert("لا يوجد اتصال بالسيرفر");
    }

    // 🔴 hide loading
    btn.disabled = false;
    loader.style.display = "none";
    text.style.opacity = "1";
}
