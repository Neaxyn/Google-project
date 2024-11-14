let repetitions = 0;
document.getElementById("send").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
// popup.js
document.getElementById("theme-toggle").addEventListener("change", function() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("chatbox").classList.toggle("dark-mode");
    document.getElementById("messages").classList.toggle("dark-mode");
    document.querySelectorAll(".user-message").forEach(el => el.classList.toggle("dark-mode"));
    document.querySelectorAll(".bot-message").forEach(el => el.classList.toggle("dark-mode"));
    document.getElementById("user-input").classList.toggle("dark-mode");
    document.getElementById("send").classList.toggle("dark-mode");
});
function formatMessage(text) {
    // Remplacer les sauts de ligne par des balises <br>
    text = text.replace(/\n/g, '<br>');
    // Remplacer les balises de mise en forme
    text = text.replace(/__(.*?)__/g, '<u>$1</u>'); // Souligné
    text = text.replace(/--(.*?)--/g, '<del>$1</del>'); // Barré

    // Remplacer les bullet points et listes
    text = text.replace(/^\s*\*\s+(.*?)(?=\n|$)/gm, '<li>$1</li>'); // Bullet points
    text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>'); // Envelopper les bullet points dans une liste

    // Remplacer les numéros de liste
    text = text.replace(/^\s*\d+\.\s+(.*?)(?=\n|$)/gm, '<li>$1</li>'); // Numéros de liste
    text = text.replace(/(<li>.*<\/li>)/g, '<ol>$1</ol>'); // Envelopper les numéros de liste dans une liste ordonnée

    return text;
}

async function sendMessage() {
    repetitions++;
    if(repetitions>1){return;}
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
    userMessageDiv.innerHTML = formatMessage(userInput);
    messageContainer.appendChild(userMessageDiv);

    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("bot-message", "typing");
    botMessageDiv.innerHTML = formatMessage(botReply);
    messageContainer.appendChild(botMessageDiv);

    if (document.body.classList.contains("dark-mode")) {
        userMessageDiv.classList.add("dark-mode");
        botMessageDiv.classList.add("dark-mode");
    }

    setTimeout(() => {
        botMessageDiv.classList.remove("typing");
    }, 3000);

    document.getElementById("user-input").value = "";
}