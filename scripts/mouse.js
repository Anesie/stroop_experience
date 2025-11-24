// Tableau pour stocker les coordonnées [X, Y] de chaque clic sur START
const startClickCoordinates = [];

// Fonction pour capturer et enregistrer les coordonnées du clic sur START
function recordStartClick(event) {
    // Enregistre les coordonnées client (par rapport à la fenêtre du navigateur)
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Stocke les coordonnées
    startClickCoordinates.push({
        mouseX: mouseX,
        mouseY: mouseY,
        time: performance.now() // Optionnel: enregistrer le temps du clic
    });

    // Afficher dans la console pour vérification immédiate
    console.log("Coordonnées START enregistrées:", mouseX, mouseY);
}

// 1. Trouver le bouton START
const startButton = document.getElementById("start-button");

// 2. Écouter le clic sur le bouton START
// IMPORTANT : Nous devons utiliser "mousedown" ou "click" et capturer les données
// avant que le bouton ne disparaisse dans stimuli.js.
if (startButton) {
    startButton.addEventListener("click", recordStartClick);
}