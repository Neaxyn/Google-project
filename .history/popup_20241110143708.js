document.getElementById("send").addEventListener("click", async function() {
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
    const botReply = data.response;  // Changez selon la structure de réponse de l'API de Nano Gemini

    // Ajouter le message de l'utilisateur
    messageContainer.innerHTML += `<div class="user-message">${userInput}</div>`;

    // Ajouter le message du bot avec l'animation d'écriture
    const botMessageDiv = document.createElement("div");
    botMessageDiv.classList.add("bot-message", "typing");
    botMessageDiv.textContent = botReply;
    messageContainer.appendChild(botMessageDiv);

    // Supprimer la classe "typing" après l'animation
    setTimeout(() => {
        botMessageDiv.classList.remove("typing");
    }, 3000); // La durée de l'animation doit correspondre à celle définie dans les styles CSS

    document.getElementById("user-input").value = "";  // Réinitialiser l'input
});