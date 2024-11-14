
document.getElementById("summarize-button").addEventListener("click", function() {
    const choiceContainer = document.getElementById("choice-container");
    choiceContainer.innerHTML = `
        <button id="summarize-website-button" class="choice-button">Summarize Website</button>
        <button id="get-key-points-button" class="choice-button">Get Key Points</button>
    `;

    document.getElementById("summarize-website-button").addEventListener("click", function() {
        // Rediriger vers l'action de résumé de site web
        console.log("Summarize Website selected");
        // Ajouter le code pour gérer le résumé de site web ici
    });

    document.getElementById("get-key-points-button").addEventListener("click", function() {
        // Rediriger vers l'action de récupération des points clés
        console.log("Get Key Points selected");
        // Ajouter le code pour gérer la récupération des points clés ici
    });
});