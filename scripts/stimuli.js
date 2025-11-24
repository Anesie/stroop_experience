(function() {


    // Bloc 1 : - 80% Incongruent et 20% Congruent (VERT/ROUGE)
    //          - 80% Congruent et 20% Incongruent (JAUNE/ BLEU)
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
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "JAUNE", ink: "blue", type: "block2_I" },
    ];

    // Bloc 1 : - 80% Incongruent et 20% Congruent (JAUNE/ BLEU)
    //          - 80% Congruent et 20% Incongruent (VERT/ROUGE)
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
        { word: "JAUNE", ink: "blue", type: "block2_I" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "yellow", type: "block2_I" },
        { word: "BLEU", ink: "blue", type: "block2_C" },
        { word: "JAUNE", ink: "yellow", type: "block2_C" },
    ];
    
    // Fonction permettant de mélanger aléatoirement des éléments d'un tableau
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // Mélanger chaque bloc et concatène les deux bloques dans la variable stimuli
    shuffle(stimuliBlock1);
    shuffle(stimuliBlock2);
    const stimuli = stimuliBlock1.concat(stimuliBlock2);
    
    //Variable permettant de compter le nombre d'essais
    let currentTrialIndex = 0;
    // Variable permettant de stocker le temps de réaction en ms
    let startTime = null;
    //tableau de données final où sont stocker les résultats de chaque essais
    let results = [];
    //Tableau temporaire qui stocke les coorodnnées de la souris enregistrées toutes les 13 ms
    let mouseTrace = [];
    //Variable permettant de contrôler l'enregistrement de la position de la souris
    let mouseInterval = null; 
    //Variable pour la coordonnée X de la souris au moment où le participant clique sur Start
    let startMouseX = null; 
    //Variable pour la coordonnée Y de la souris au moment où le participant clique sur Start
    let startMouseY = null;
    
    // Référence au bouton start
    const startButton = document.getElementById("start-button");
    // Référence au stimuli stroop affiché
    const stimulusDisplay = document.getElementById("display-text"); 
    // Référence au symbole X 
    const feedbackSymbol = document.getElementById("feedback-symbol");
    // Référence au boîte de réponse
    const responseBoxes = document.querySelectorAll(".response-box");
    
    // Fonction pour enregistrer la position de la souris
    // Elle se déclenche que lorsque que le temps de réaction n'est pas null, car cela implique qu'un essais à commencer (le stimuli est visible)
    function recordMousePosition(event) {
        if (startTime !== null) { 
            mouseTrace.push({ // ajoute les nouvelles coordonnées au tab mouseTrace
                //performance.now() permet d'enregistrer le temps de réaction à partir du moement où le mot apparaît à l'écran
                // performance.now() - startTime : calcule le temps de réaction
                time: performance.now() - startTime, 
                x: event.clientX,
                y: event.clientY
            });
        }
    }
    
    // Permet de grer la transition entre les 2 blocs
    function checkBlockTransition() {
        if (currentTrialIndex === stimuliBlock1.length) { 
            stimulusDisplay.textContent = "Fin du 1er bloc !";
            stimulusDisplay.style.color = "white";
            stimulusDisplay.style.display = "block";    
            // Réaffiche le bouton Start pour la transition
            startButton.style.display = "flex";
            
            return true; 
        }
        return false;
    }
    
    // permet de gérer le fonctionnement de l'exprience globale
    function startTrial() {
        //La première condition permets de vérifier que l'expérience n'est pas fini
        if (currentTrialIndex >= stimuli.length) {
            stimulusDisplay.textContent = "Fin!";
            stimulusDisplay.style.color = "white";
            responseBoxes.forEach(box => { box.style.display = "none"; });
            startButton.style.display = "none";
            console.table(results); // Permet d'afficher les résultats dans la console
            return;
        }

        const trial = stimuli[currentTrialIndex];
        
        //Permet de cacher le Bouton Start et le Curseur lorsque le participnt appuie sur le bouton start
        startButton.style.display = "none";
        document.body.classList.add('cursor-hidden'); 
        stimulusDisplay.style.display = "none"; 
    
        setTimeout(() => {
            
            //Afficher le Stimulus et le Curseur
            document.body.classList.remove('cursor-hidden'); 
            
            stimulusDisplay.style.display = "block"; 
            stimulusDisplay.textContent = trial.word;
            stimulusDisplay.style.color = trial.ink; 
            
            // Permet de lancer le chronomètre  
            startTime = performance.now();
            
            // Enregistre le mouvement de la souris toutes les 13 ms
            document.addEventListener('mousemove', recordMousePosition); 
            mouseInterval = setInterval(() => {
            }, 13);

        // Délai de 300ms avant l'affichage du stimulus
        }, 300); 
    }
    
    
    function handleResponse(event) {
        if (startTime === null) return; 
    
        // Permets d'arrêter le chrono
        clearInterval(mouseInterval); 
        document.removeEventListener('mousemove', recordMousePosition); 
    
        // Permets de passer de l'anglais au français pour ink lorsqu'on compare
        const inkColorMap = {
            'red': 'rouge',
            'green': 'vert',
            'blue': 'bleu',
            'yellow': 'jaune'
        };
    
        // Capture des coordonnées de la souris et du temps de réaction
        const endMouseX = event.clientX;
        const endMouseY = event.clientY;
        const reactionTime = performance.now() - startTime;
        startTime = null; 
        
        //Variable stockant l'élément selectionné par le participant
        const responseBox = event.currentTarget;
        //Variable stockant id du résultat sélectionner
        const participantResponse = responseBox.id; 
        // Variable stockant les données complètes de l'essai en cours(le mot, ink attendu, le type d'essai Congrue ou Incongrue)
        const currentTrial = stimuli[currentTrialIndex];
        //Récupère la bonne encre de l'essai en cours
        const correctInk = currentTrial.ink;
        //permet de vérifier que l'encre du stimulus = à la réponse sélectionner par le participant
        const correctInkId = inkColorMap[correctInk]; 
        const isCorrect = (participantResponse === correctInkId);
    
        // Permets d'ajouter toutes les données dans le tableau results
        results.push({
            // Incrémenter le nombre d'essai pour savoir la fin 
            trialNumber: currentTrialIndex + 1,
            word: currentTrial.word, 
            inkColor: currentTrial.ink, 
            response: participantResponse,
            reactionTime: reactionTime.toFixed(2), 
            isCorrect: isCorrect, 
            type: currentTrial.type,
            startMouseX: startMouseX, 
            startMouseY: startMouseY,
            endMouseX: endMouseX, 
            endMouseY: endMouseY,
            mouseTrace: mouseTrace 
        });
        
        // Permets de réinitialiser la trace pour l'essai suivant
        mouseTrace = [];
    
        currentTrialIndex++;
        
        stimulusDisplay.style.display = "none";
        
        
        let ITIDelay = 500; // Délai de 500 ms entre chaque essai
    
        //si la réponse du participant ne correspond pas à l'encre, affichage de la croix X
        if (!isCorrect) {
            feedbackSymbol.textContent = 'X';
            feedbackSymbol.style.display = 'block';
            // Délai de 2 secondes en cas d'erreur avant de faire réapparaître le bouton start
            ITIDelay = 2000; 
        } 
    
        // Permets de vérifier s'il reste des essais à jouer
        if (currentTrialIndex < stimuli.length) {
            
            //Vérifie si c'est le début d'un bloc puis affiche le bouton start
            if (checkBlockTransition()) {
                return;
            }

            setTimeout(() => {
                // Permet de cacher la croix rouge si elle était affichée
                if (!isCorrect) {
                    feedbackSymbol.style.display = 'none';
                }
                startButton.style.display = "flex"; 
            }, ITIDelay); 
            
        } else {
            startTrial(); // Affiche la fin de l'essai
        }
        
        //Les coordonnées sont réinitialiser pour l'essai d'après
        startMouseX = null;
        startMouseY = null;
    }
    
    //Permet de cliquer sur le bouton Start
    startButton.addEventListener("click", function(event) {
        if (currentTrialIndex === stimuliBlock1.length) {
            stimulusDisplay.style.display = "none";
        }
        
        // Capture les coordonnées de départ de la souris
        startMouseX = event.clientX;
        startMouseY = event.clientY;
        
        //Permets de déclencher le début de l'essai
        startTrial();
    });
    
    responseBoxes.forEach(box => {
        box.addEventListener("click", handleResponse);
    });
    
    //Permet de rendre visible les 4 boîtes de réponse
    document.getElementById('rouge').style.display = 'flex';
    document.getElementById('vert').style.display = 'flex';
    document.getElementById('bleu').style.display = 'flex'; 
    document.getElementById('jaune').style.display = 'flex'; 
    
    startButton.style.display = "flex";
    
    })();