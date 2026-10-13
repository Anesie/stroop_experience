# 🧠 Stroop Task Experiment

## 📖 Presentation
This project is a web implementation of the famous **Stroop task**, a classic cognitive psychology experiment used to evaluate cognitive interference and inhibitory control.

In this experiment, participants are presented with color words ("RED", "GREEN", "BLUE", "YELLOW") printed in different ink colors. **The objective is to click on the box corresponding to the ink color while ignoring the written word.**

This script was developed specifically for behavioral and motor data collection, with a strong focus on temporal precision and the spatial tracking of decision-making movements.

## ✨ Key Features
- **Structured Experimental Design:** The experiment is divided into 6 blocks of 20 trials, including automatic pauses between blocks.
- **Congruent and Incongruent Conditions:** Randomized mixing (via a shuffle algorithm) of congruent stimuli (e.g., the word "RED" written in red) and incongruent stimuli (e.g., the word "GREEN" written in red) with specific ratios to manipulate anticipation.
- **Mouse Tracking:** Recording the full mouse trajectory every 13 milliseconds to analyze motor movements and cognitive hesitation.
- **High-Precision Chronometry:** Use of the `performance.now()` API to ensure reaction time (RT) recording with millisecond-level precision.
- **Visual Feedback:** Displaying a visual penalty (a large red "X") and an additional delay (2 seconds) on incorrect responses, forcing the participant to refocus.

## 📊 Collected Data
At the end of the experiment, the script generates a detailed results array (`results`), ready to be exported for statistical analysis (e.g., via R or Python). For each trial, the following data is recorded:
- `trialNumber`: Trial number.
- `word` & `inkColor`: The displayed word and the actual ink color.
- `type`: Trial type (Congruent or Incongruent).
- `response` & `isCorrect`: The participant's choice and accuracy evaluation (True/False).
- `reactionTime`: Exact reaction time.
- `startMouseX` / `startMouseY`: Coordinates of the initial click (start).
- `endMouseX` / `endMouseY`: Coordinates of the final click (response).
- `mouseTrace`: A sub-array containing the complete history of mouse coordinates (x, y) and timestamps during the trial.

## 🛠️ Technologies Used
- **HTML5 / CSS3:** Creation of a minimalist interface (black background, white text) to eliminate visual distractions and force attention onto the stimuli.
- **Vanilla JavaScript:** Experiment logic, real-time DOM manipulation, event handling (`Event Listeners`), asynchronous timers (`setTimeout`, `setInterval`), and data storage.

## 🚀 Installation and Usage
This project is a pure client-side script (Front-end) and requires no server or local database installation.



1. Clone this GitHub repository:
   ```bash
   git clone [https://github.com/Anesie/stroop_experience.git](https://github.com/Anesie/stroop_experience.git)
   ```
   
2. Open the index.html file in any modern web browser.
3. Click START to run the experiment.
4. Open your browser's developer console (F12 -> Console) at the end of the experiment to view the generated data table (console.table(results)).

### 👥 Authors
Andrea Behar & Anesie Martiniani - Development (MIASHS Project)
