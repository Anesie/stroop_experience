(function() {
    
    // BLOC 1
    const stimuliBlock1 = [
        { word: "ROUGE", ink: "red", type: "block1_C" },
        { word: "VERT", ink: "green", type: "block1_C" },
        { word: "VERT", ink: "red", type: "block1_I" },
        { word: "VERT", ink: "red", type: "block1_I" },
        { word: "VERT", ink: "red", type: "block1_I" },
        { word: "VERT", ink: "red", type: "block1_I" },
        { word: "ROUGE", ink: "green", type: "block1_I" },
        { word: "ROUGE", ink: "green", type: "block1_I" },
        { word: "ROUGE", ink: "green", type: "block1_I" },
        { word: "ROUGE", ink: "green", type: "block1_I" },
        { word: "JAUNE", ink: "yellow", type: "block2_C" },
        { word: "JAUNE", ink: "yellow", type: "block2_C" },
        { word: "JAUNE", ink: "yellow", type: "block2_C" },
        { word: "JAUNE", ink: "yellow", type: "block2_C" },
        { word: "BLEU", ink: "blue", type: "block2_C" },
        { word: "BLEU", ink: "blue", type: "block2_C" },
        { word: "BLEU", ink: "blue", type: "block2_C" },
        { word: "BLEU", ink: "blue", type: "block2_C" },
    ];
    
    // BLOC 2 
    const stimuliBlock2 = [
        { word: "ROUGE", ink: "green", type: "block1_I" },
        { word: "VERT", ink: "red", type: "block1_I" },
        { word: "VERT", ink: "green", type: "block1_C" },
        { word: "VERT", ink: "green", type: "block1_C" },
        { word: "VERT", ink: "green", type: "block1_C" },
        { word: "VERT", ink: "green", type: "block1_C" },
        { word: "ROUGE", ink: "red", type: "block1_C" },
        { word: "ROUGE", ink: "red", type: "block1_C" },
        { word: "ROUGE", ink: "red", type: "block1_C" },
        { word: "ROUGE", ink: "red", type: "block1_C" },
        { word: "JAUNE", ink: "blue", type: "block2_I" },
        { word: "JAUNE", ink: "blue", type: "block2_I" },
        { word: "JAUNE", ink: "blue", type: "block2_I" },
        { word: "JAUNE", ink: "yellow", type: "block2_C" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "blue", type: "block2_C" },
    ];
    
    //fonction pour trier aléatoirement un tableau
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // Mélange chaque bloc et concaténer les 20 essais
    shuffle(stimuliBlock1);
    shuffle(stimuliBlock2);
    const stimuli = stimuliBlock1.concat(stimuliBlock2);
    
    let currentTrialIndex = 0;
    let startTime = null;
    let results = [];
    //let mouseTrace = [];
    //let mouseInterval = null; 
    let startMouseX = null;
    let startMouseY = null;
    
    const startButton = document.getElementById("start-button");
    const stimulusDisplay = document.getElementById("display-text"); 
    const responseBoxes = document.querySelectorAll(".response-box");
    
    //Transistion entre le block 1 & le bloc 2
    function checkBlockTransition() {
        // Vrai si nous sommes après l'essai 10 (au début du 11e essai)
        if (currentTrialIndex === stimuliBlock1.length) { 
            
            // Afficher le message de transition (Les 4 boîtes restent visibles)
            stimulusDisplay.textContent = "Fin du 1er essai";
            stimulusDisplay.style.color = "white";
            stimulusDisplay.style.display = "block";
            
            // Réafficher le bouton START pour la transition
            startButton.style.display = "flex";
            
            return true; // Bloque le démarrage du prochain essai jusqu'à un autre clic START
        }
        return false;
    }

    
    function startTrial() {
        if (currentTrialIndex >= stimuli.length) {
            // FIN DE L'EXPÉRIENCE
            stimulusDisplay.textContent = "FIN, MERCI!";
            stimulusDisplay.style.color = "white";
            responseBoxes.forEach(box => { box.style.display = "none"; });
            startButton.style.display = "none";
            console.table(results); 
            return;
        }
    
        const trial = stimuli[currentTrialIndex];
        
        // ÉTAPE 1 : Cacher le Bouton et le Curseur
        startButton.style.display = "none";
        document.body.classList.add('cursor-hidden'); 
        stimulusDisplay.style.display = "none"; 
    
        // ÉTAPE 2 : Délai de 300ms (Foreperiod)
        setTimeout(() => {
            
            // ÉTAPE 3 : Afficher le Stimulus et le Curseur
            document.body.classList.remove('cursor-hidden'); 
            
            stimulusDisplay.style.display = "block"; 
            stimulusDisplay.textContent = trial.word;
            stimulusDisplay.style.color = trial.ink; 
            
            // ÉTAPE 4 : Lancer le Timer
            startTime = performance.now();
            
        }, 300); 
    }
    
    function handleResponse(event) {
        if (startTime === null) return; 
    
        // Modification du nom de l'encre de l'anglais vers le français pour que quand on fait red==rouge => renvoie true
        const inkColorMap = {
            'red': 'rouge',
            'green': 'vert',
            'blue': 'bleu',
            'yellow': 'jaune'
        };
    
        // Capture des coordonnées de la souris 
        const endMouseX = event.clientX;
        const endMouseY = event.clientY;
        const reactionTime = performance.now() - startTime;
        startTime = null; 
        
        const responseBox = event.currentTarget;
        const participantResponse = responseBox.id; 
        const currentTrial = stimuli[currentTrialIndex];
        
        const correctInk = currentTrial.ink;
        
        // VÉRIFICATION DE LA CORRECTION : Utilisation du mapping
        const correctInkId = inkColorMap[correctInk]; 
        const isCorrect = (participantResponse === correctInkId);
    
        // Enregistrement des résultats
        results.push({
            trialNumber: currentTrialIndex + 1,
            word: currentTrial.word, inkColor: currentTrial.ink, response: participantResponse,
            reactionTime: reactionTime.toFixed(2), isCorrect: isCorrect, type: currentTrial.type,
            startMouseX: startMouseX, startMouseY: startMouseY,
            endMouseX: endMouseX, endMouseY: endMouseY
        });
    
        currentTrialIndex++;
        
        stimulusDisplay.style.display = "none";
        
        // --- GESTION DE LA SUITE (ITI de 500ms ou Transition) ---
        if (currentTrialIndex < stimuli.length) {
            
            if (checkBlockTransition()) {
                return; 
            }
            
            // Délai ITI de 500ms
            setTimeout(() => {
                startButton.style.display = "flex"; 
            }, 500); 
            
        } else {
            startTrial(); // Afficher la fin
        }
        
        startMouseX = null;
        startMouseY = null;
    }
    
    // --- GESTION DES ÉVÉNEMENTS et INITIALISATION ---
    
    startButton.addEventListener("click", function(event) {
        // Masquer le message de transition si présent
        if (currentTrialIndex === stimuliBlock1.length) {
            stimulusDisplay.style.display = "none";
        }
        
        // Capture des coordonnées de départ de la souris
        startMouseX = event.clientX;
        startMouseY = event.clientY;
        
        startTrial();
    });
    
    responseBoxes.forEach(box => {
        box.addEventListener("click", handleResponse);
    });
    
    // INITIALISATION AU CHARGEMENT :
    // Les 4 boîtes doivent être visibles du début à la fin (pour le Bloc 1 et 2).
    // Si vous aviez un CSS qui masquait les boîtes, il faut le corriger.
    
    document.getElementById('rouge').style.display = 'flex';
    document.getElementById('vert').style.display = 'flex';
    document.getElementById('bleu').style.display = 'flex'; // Rendre visible
    document.getElementById('jaune').style.display = 'flex'; // Rendre visible
    
    startButton.style.display = "flex";
    
    })();