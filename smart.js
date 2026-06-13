function sendMessage() {

    const input = document.getElementById("userInput");
    const messages = document.getElementById("messages");

    if (!input || !messages) return;
    if (input.value.trim() === "") return;

    messages.innerHTML += `
        <div class="user-message">${input.value}</div>
    `;

    messages.innerHTML += `
        <div class="bot-message">شكراً لسؤالك، سيتم تطوير الردود لاحقاً.</div>
    `;

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
}