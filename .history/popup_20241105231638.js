document.getElementById("sendButton").addEventListener("click", async function() {
    echo "test";
    const userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    const response = await fetch('http://127.0.0.1:5500/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'AIzaSyAe6bAVaFgub8ZRX8eqwlCw78LfxgfrLvs' // Insérez ici votre clé API de Nano Gemini
        },
        body: JSON.stringify({
            message: userInput
        })
    });

    const data = await response.json();
    const botReply = data.response;  // Changez selon la structure de réponse de l'API de Nano Gemini

    const messageContainer = document.getElementById("messages");
    messageContainer.innerHTML += `<div class="user-message">${userInput}</div>`;
    messageContainer.innerHTML += `<div class="bot-message">${botReply}</div>`;
    
    document.getElementById("userInput").value = "";  // Réinitialiser l'input
});
