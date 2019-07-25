//button even listeners
const numBtns = document.querySelectorAll('.numBtn');
const operators = document.querySelectorAll('.symbol')
numBtns.forEach((number) => number.addEventListener('click', () => value(number.getAttribute('value'))));
operators.forEach((operator) => operator.addEventListener('click', () => operate(operator.getAttribute('value'))));


//global variables
let bottomDisplay = '';
let topDisplay = '';
let mathToDo = '';


function value(number) {
    if(number==='.' && checkDecimal()) return;
    bottomDisplay += number;
    displayBot();
}

function displayBot() {
    const display = document.querySelector('.display-bottom');
      
    display.textContent = bottomDisplay;
}

function checkDecimal() {
    const check = (bottomDisplay.split('.').length) - 1;
    return (check > 0);
}

function operate(operator) {
    if(mathToDo === '') return;

    mathToDo = operator;

}