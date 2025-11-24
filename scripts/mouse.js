// Tableau pour stocker les coordonnées X et Y de la souris pour chaque clic sur Start
const startClickCoordinates = [];

// Fonction pour capturer et enregistrer les coordonnées du clic sur Start
function recordStartClick(event) {
    // Enregistre les coordonnées du participant
    const mouseX = event.participantX;//
    const mouseY = event.participant//tY;

    // Stocke les coordonnées
    startClickCoordinates.push({
        mouseX: mouseX,
        mouseY: mouseY,
        time: performance.now()
    });

    // Permet d'afficher dans la console immédiate
    console.log("Coordonnées Start enregistrées:", mouseX, mouseY);
}

const startButton = document.getElementById("start-button");

if (startButton) {
    startButton.addEventListener("click", recordStartClick);
}