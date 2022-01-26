let add = (a,b) => a+b; //operator addition function
let subtract = (a,b) => a-b; // operator subtraction function
let multiply = (a,b) => a*b; // operator multiplication function
let divide = (a,b) => a / b; // operator division function 
let firstValue = 0; // first stored value 
let secondValue = 0; // second stored value 
let chosenOperator = ""; // chosen operator initialized to blank
let answer = 0; // answer coming from the first value the chosen operator and second value 
let input = document.getElementById('input'); // input 
let output = document.getElementById('output') // output
const clear = document.getElementById('clear'); // AC button
const del = document.getElementById('delete'); // delete button
const equate = document.getElementById('equals') //equate button
const buttons = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'decimal']; // arrray for buttons
const operators = ["divide", "multiply", "add", "subtract"]; //array for operators
let populateInput = (i) =>{input.textContent += i} //populate input
let populateOutput = (i) => output.textContent += i; // populate output

function AC () { //clear the calculator
    input.textContent = "";
    output.textContent = "";
    firstValue = 0;
    secondValue = 0;
    answer = 0;
    chosenOperator = "";
}

let d = () => {// delete a character from input unless operation is currently in input 
    if(input.textContent.includes('+') || input.textContent.includes('-') || input.textContent.includes('*') || input.textContent.includes('/')){
        alert('Clearing Calculator for next operation..');
        AC();
    }else{
        input.textContent = input.textContent.substring(0, input.textContent.length -1);
    } 
} 
clear.addEventListener('click', AC); //event listener that calls on AC to clear input
del.addEventListener('click', d); // event listener that calls on d to delete a number 

buttons.forEach(button =>{ // loop through each member of buttons array to have a selected event listener for each button
    let selection = document.getElementById(button);
    selection.addEventListener('click', () =>{
        if(button == 'zero' && input.textContent.length > 0 && !input.textContent.includes('.')){} // no leading zeros messes up math
        else if(button == 'decimal' && input.textContent.includes('.')){} // no repeating decimals
        else if(output.textContent != "" && input.textContent != ""){
            AC();
            populateOutput(selection.getAttribute('value'))
        }
        else{
            populateInput(selection.getAttribute('value'));
        }
    })
}) 

function operate(operator, a, b){ //operate function uses conditionals based on case 
        switch(operator){
            case '+':
                return add(a,b);
            case '-':
                return subtract(a,b);
            case '*':
                return multiply(a,b);
            case '/': 
                return divide(a,b);    
        }
}

operators.forEach(operator => { // for each loop to create event listeners for each operator 
    let selection = document.getElementById(operator);
    selection.addEventListener('click', () =>{
        if(chosenOperator != ""){
            alert("You can only choose one operation");
            return;
        }

        if(output.textContent != ""){
            firstValue = Number(output.textContent);
            output.textContent = "";
        }else{
            firstValue = Number(input.textContent);
        }
        chosenOperator = selection.getAttribute('value');
        input.textContent = "";
        selection.classList.add('hover');
    })
})

function evaluate() {
    if(input.textContent != ""){
        secondValue = Number(input.textContent);
    }else{
        secondValue = 0;
    }

    if(secondValue == 0 && chosenOperator == "/"){ // check case to make sure users don't divide by zero 
        alert("Sorry you can't divide by 0");
        operators.forEach(op =>{
            document.getElementById(op).classList.remove('hover');
        })
        AC();
        return;
    }

    if(chosenOperator == ""){
        alert('Please choose operation');
        AC();
        return;
    }

    answer = operate(chosenOperator, firstValue, secondValue);
    input.textContent = firstValue + chosenOperator + secondValue
    populateOutput(answer);
    chosenOperator = "";
    operators.forEach(op =>{
        document.getElementById(op).classList.remove('hover');
    })
}

equate.addEventListener('click',evaluate) // equate event listener

window.addEventListener('keydown', (e)=>{ // keyboard functionality for selecting items equating and operatorion
    if(e.keyCode == 8){ // backspace functionality
        d();
        return;
    }
    if(e.keyCode == 110 && input.textContent.includes('.')){return;} // no repeating decimal points
    if(e.keyCode == 107 || e.keyCode == 111 || e.keyCode == 106 || e.keyCode == 109){ // operation functionality
        let key = document.querySelector(`.gi[data-key="${e.keyCode}"]`);
        if(chosenOperator != ""){
            alert("You can only choose one operation");
            return;
        }
        if(output.textContent != ""){
            firstValue = Number(output.textContent);
            output.textContent = "";
        }else{
            firstValue = Number(input.textContent);
        }
        chosenOperator = key.getAttribute('value');
        input.textContent = "";
        key.classList.add('hover');
        return;
    }

    if(e.keyCode == 13){ // logic for equate button (enter on numpad)
        evaluate();
        return;
    }

    let key = document.querySelector(`.gi[data-key="${e.keyCode}"]`); // choose number 
    if(!key){ // if user doesn't use numpad or specified keys
        console.log('Try the numpad');
        return;
    }
    if(key.value == 'zero' && input.textContent.length > 0 && !input.textContent.includes('.')){} // no leading zeros messes up math
    else if(key.value == 'decimal' && input.textContent.includes('.')){} // no repeating decimals
    else if(output.textContent != "" && input.textContent != ""){
        AC();
        key.classList.add('hover');
        setTimeout(function(){key.classList.remove('hover')}, 200);
        populateOutput(key.getAttribute('value'))
    }
    else{
        key.classList.add('hover');
        setTimeout(function(){key.classList.remove('hover')}, 200);
        populateInput(key.getAttribute('value'));
    }
})