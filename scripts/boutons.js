
// Variable to display
let myVariable = "Hello world";
      
// Get the button and the paragraph
const startButton = document.getElementById("start-button");
const displayText = document.getElementById("display-text");
      
// Add click event
startButton.addEventListener("click", function() {
// Show the paragraph and set its text
displayText.style.display = "block"; // make it visible
displayText.textContent = myVariable; // set the text
});
