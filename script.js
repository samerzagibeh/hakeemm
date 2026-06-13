console.log("JS Connected");


const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const resultBox = document.getElementById("result");
const canvas = document.getElementById('heartbeatCanvas');
const ctx = canvas.getContext('2d');


dropArea.addEventListener("click", () => {
    fileInput.click();
});


dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});


dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");

    const files = e.dataTransfer.files;

    if (files.length) {
        fileInput.files = files;
        showFile(files[0]);
    }
});


fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
        showFile(fileInput.files[0]);
    }
});


function showFile(file) {
    let fileNameEl = document.getElementById("fileName");

    if (!fileNameEl) {
        fileNameEl = document.createElement("p");
        fileNameEl.id = "fileName";
        dropArea.appendChild(fileNameEl);
    }

    fileNameEl.textContent = "📄 " + file.name;
}


async function analyzeReport() {

    if (!fileInput.files.length) {
        alert("اختر ملف أولاً");
        return;
    }

    resultBox.innerHTML = "<p>⏳ جاري تحليل التقرير...</p>";

    const file = fileInput.files[0];

    try {

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
            "https://hakeemm-7.onrender.com/api/analyze-file",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        if (data.success) {
            showResult(data.answer);
        } else {
            alert(data.message || "حدث خطأ");
        }

    } catch (error) {
        console.log(error);
        alert("خطأ في الاتصال بالسيرفر");
    }
}


function showResult(text) {
    resultBox.innerHTML = `
        <h3>نتيجة التحليل</h3>
        <p>${text}</p>
    `;
}


function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let offset = 0;

function drawHeartbeat() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerY = canvas.height / 2;
    const width = canvas.width;

    ctx.beginPath();
    ctx.strokeStyle = '#0084ff';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.shadowBlur = 6;
    ctx.shadowColor = '#0084ff';

    ctx.moveTo(0, centerY);

    for (let x = 0; x < width; x++) {
        let angle = (x + offset) * 0.05;
        let pulse = Math.sin((x + offset) * 0.01);

        let y = Math.sin(angle) *
            Math.pow(Math.sin(angle * 0.2), 4) *
            (centerY * 0.7) *
            Math.abs(pulse);

        ctx.lineTo(x, centerY + y);
    }

    ctx.stroke();

    offset += 4;
    requestAnimationFrame(drawHeartbeat);
}

drawHeartbeat();


const cards = document.querySelectorAll('.card');

function showOnLoad() {
    const elements = document.querySelectorAll('.card, .feature-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
}

showOnLoad();
const menuBtn = document.getElementById("menuBtn");
const menuItems = document.getElementById("menuItems");

menuBtn.onclick = () => {
    menuBtn.classList.toggle("active");
    menuItems.classList.toggle("show");
};
function logout() {
    // حذف أي بيانات مخزنة
    localStorage.clear();

    // تحويل لصفحة البداية
    window.location.href = "index.html";
}
async function toggleDarkMode() {
    const darkMode = document.body.classList.toggle("dark-mode");

   await fetch("https://hakeemm-2.onrender.com/api/settings/theme", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            darkMode: darkMode
        })
    });
}
