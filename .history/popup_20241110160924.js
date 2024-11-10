document.getElementById("send").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", function(event) {
    i++;
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    const messageContainer = document.getElementById("messages");

    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userInput
        })
    });

    const data = await response.json();
    const botReply = data.response;

    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("user-message");
    userMessageDiv.textContent = userInput;
    messageContainer.appendChild(userMessageDiv);

    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("bot-message", "typing");
    botMessageDiv.textContent = botReply;
    messageContainer.appendChild(botMessageDiv);

    // Ajoutez la classe dark-mode si le mode sombre est activé
    if (document.body.classList.contains("dark-mode")) {
        userMessageDiv.classList.add("dark-mode");
        botMessageDiv.classList.add("dark-mode");
    }

    setTimeout(() => {
        botMessageDiv.classList.remove("typing");
    }, 3000);

    document.getElementById("user-input").value = "";
}

document.getElementById("theme-toggle").addEventListener("change", function() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("chatbox").classList.toggle("dark-mode");
    document.getElementById("messages").classList.toggle("dark-mode");
    document.querySelectorAll(".user-message").forEach(el => el.classList.toggle("dark-mode"));
    document.querySelectorAll(".bot-message").forEach(el => el.classList.toggle("dark-mode"));
    document.getElementById("user-input").classList.toggle("dark-mode");
    document.getElementById("send").classList.toggle("dark-mode");
});