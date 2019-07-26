const numBtns = document.querySelectorAll('.numBtn');
const operators = document.querySelectorAll('.symbol');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const calcDisplayBottom = document.querySelector('.display-bottom');
const calcDisplayTop = document.querySelector('.display-top');
const backspace = document.querySelector('.delete');

numBtns.forEach((number) => number.addEventListener('click', () => input(number.getAttribute('value'))));
operators.forEach((operator) => operator.addEventListener('click', () => operate(operator.getAttribute('value'))));
equals.addEventListener('click', solution);
clear.addEventListener('click', resetValues);
backspace.addEventListener('click', deleteLastNumber);

//global variables
let bottomDisplay = '';
let topDisplay = '';
let inputNumber = '';
let value = 0;
let lastOperator = '';
let hitEquals = false;


function input(number) {
    if(hitEquals) {
        resetValues();
        hitEquals = false;
    }    

    // Change ifstatement to add '.' if hasdecimal === true. make hasdecimal and update rest of function to be cleaner addition of numbers.
    if(number==='.' && checkDecimalValid()) return;
    bottomDisplay = bottomDisplay +number;
    inputNumber =  Number(bottomDisplay);
    display();
}

function display() {    
    calcDisplayBottom.textContent = bottomDisplay;
    calcDisplayTop.textContent = topDisplay;
    checkLength();
}

function checkLength() {
    if (bottomDisplay.length > 12) {
        calcDisplayBottom.setAttribute('style', 'direction: rtl');
    }
}

function checkDecimalValid() {
    const check = bottomDisplay.split('.').length;
    return (check > 1);
}

function checkOperatorPresent() {
    let operatorCheck = topDisplay.charAt((topDisplay.length-1));
    if (operatorCheck === '+' && bottomDisplay === '') {
        return true;
    } else if (operatorCheck === '-' && bottomDisplay === '') {
        return true;
    } else if (operatorCheck === '*' && bottomDisplay === '') {
        return true;
    } else if (operatorCheck === '/' && bottomDisplay === '') {
        return true;
    } else {
        return false;
    }
}

function operate(operator) {
    doLastOperation();
    hitEquals = false;

    if(checkOperatorPresent()) return;
    topDisplay = value + ' ' + operator;
    bottomDisplay = '';
    inputNumber= '';
    display();   
    
    lastOperator = operator;  
}

function doLastOperation () {
    
    if (lastOperator === '+') {
        value += Number(inputNumber);
    } else if (lastOperator === '-') {
        value -= Number(inputNumber);
    } else if (lastOperator === '*') {
        value *= Number(inputNumber);
    } else if (lastOperator === '/') {
        value /= Number(inputNumber);
    } else {
        value = Number(inputNumber);
    }
}

function solution () {
    doLastOperation();
    topDisplay = value + '';
    bottomDisplay = '';
    hitEquals = true;

    
    display();
}

function resetValues() {
    topDisplay = '';
    bottomDisplay = '';
    value = 0;
    inputNumber = 0;
    lastOperator = '';
    display();
}

function deleteLastNumber () {
    let newDisplay = bottomDisplay.slice(0, -1);
    bottomDisplay = newDisplay;
    inputNumber = newDisplay;
    display();
    
}