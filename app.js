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
    if(number==='.' && checkDecimalValid()) {
        return;
    } else {
        bottomDisplay = bottomDisplay +number;
        inputNumber =  Number(bottomDisplay);
        display(bottomDisplay, topDisplay);
    }
    
}

function display(bottom, top) {    
    bottomDisplay = bottom;
    topDisplay = top;

    calcDisplayBottom.textContent = bottom;
    calcDisplayTop.textContent = top;

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
    if(!hitEquals) {
        doLastOperation();
    }
    hitEquals = false;

    if(!checkOperatorPresent()){
        display('', value + ' ' + operator);   
    }
        
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
    hitEquals = true;    
    display('', value + '');
}

function resetValues() {
    value = 0;
    lastOperator = '';
    display('', '');
}

function deleteLastNumber () {
    let newDisplay = bottomDisplay.slice(0, -1);
    inputNumber = newDisplay;
    display(newDisplay, topDisplay);    
}