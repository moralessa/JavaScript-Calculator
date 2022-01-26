let add = (a,b) => a+b;
let subtract = (a,b) => a-b;
let multiply = (a,b) => a*b;
let divide = (a,b) => a / b;
let firstValue = 0;
let secondValue = 0;
let chosenOperator = "";
let answer = 0;
let input = document.getElementById('input');
let output = document.getElementById('output')
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const equate = document.getElementById('equals')
const buttons = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'decimal'];
const operators = ["divide", "multiply", "add", "subtract"];
let populateInput = (i) => input.textContent += i;
let populateOutput = (i) => output.textContent += i;

function AC () {
    input.textContent = "";
    output.textContent = "";
    firstValue = 0;
    secondValue = 0;
    answer = 0;
    chosenOperator = "";
}

let d = () => input.textContent = input.textContent.substring(0, input.textContent.length -1);
clear.addEventListener('click', AC); //event listener that calls on AC to clear input
del.addEventListener('click', d); // event listener that calls on d to delete a number 

buttons.forEach(button =>{ // loop through each member of buttons array to have a selected event listener for each button
    let selection = document.getElementById(btn);
    selection.addEventListener('click', () =>{
        if(btn == 'zero' && input.textContent.length > 0 && !input.textContent.includes('.')){} // no leading zeros messes up math
        else if(btn == 'decimal' && input.textContent.includes('.')){} // no repeating decimals
        else if(output.textContent != "" && input.textContent != ""){
            AC();
            populateOutput(selection.getAttribute('value'))
        }
        else{
            populateInput(selection.getAttribute('value'));
        }
    })
}) 
window.addEventListener('keydown', (e)=>{
    console.log(e);
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

equate.addEventListener('click', () =>{
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
})


