    // lsitens for the buttons that are clicked on by the user
    // adds an event listener to each button

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if(this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter"){
            checkAnswer();
        }
    })

    runGame("addition");
})

function runGame(gameType){

    document.getElementById("answer-box").value ="";
    document.getElementById("answer-box").focus();

    // function provides 2 random numbers for the game 

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if(gameType === "addition"){
        displayAdditionQuestion(num1, num2)

    } else if (gameType === "multiply"){
        displayMultiplicationQuestion(num1, num2);

    } else if (gameType === "subtract"){
        displaySubtractionQuestion(num1, num2);
        
    } else if (gameType === "division"){
        displayDivisionQuestion(num1, num2);

    } else {
        alert(`unknow game type ${gameType}`);
        throw `unknown game type ${gameType}, aborting!`;
    }

} 

function checkAnswer(){
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if(isCorrect) {
        alert("Hey! You got it right! :D")
        incrementScore();
    } else {
        alert(`Awwwww no you got that mushy brain, the correct answer was ${calculatedAnswer[0]}`)
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);


}

function calculateCorrectAnswer(){

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator ==="x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }  else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`unimplemented operator ${operator}`);
        throw `unimplemented operator ${operator}, aborting`
    }

}

function incrementScore(){

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer(){

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractionQuestion(operand1, operand2){

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplicationQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1 * operand2;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";

}

