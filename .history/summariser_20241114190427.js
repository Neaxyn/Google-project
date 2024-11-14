document.getElementById("summarize-button").addEventListener("click", function() {
    const choiceContainer = document.getElementById("choice-container");
    choiceContainer.innerHTML = `
        <button id="summarize-website-button" class="choice-button">Summarize Website</button>
        <button id="get-key-points-button" class="choice-button">Get Key Points</button>
    `;
