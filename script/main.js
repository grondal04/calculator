
var numberBtns = []
var btnAdd, btnMinus, btnMul, btnDiv, btnEqual;
var btnCE, btnC, btnInverse, btnNegativeSwitch, btnCommas;

var toCalcNumber1 = ''; num1Commas = false;
var toCalcNumber2 = ''; num2Commas = false;
var sign = ''
var currentResult = 0;

let equalPressed = false;

var pUserInputDisplay, pResult;

document.addEventListener('DOMContentLoaded', function() {
    btnAdd = this.getElementById('btn-add');
    btnAdd.addEventListener('click', function() {
        if (currentResult === 'NaN') return;

        if (toCalcNumber1 === '' || toCalcNumber1 === '0') 
            if (!equalPressed) return;

        if (equalPressed) 
            equalPressed = false;
        
        if (sign !== '' && toCalcNumber1 !== '' && toCalcNumber2 !== '') {
            getResult();
            toCalcNumber1 = currentResult;
            toCalcNumber2 = '';
        }

        if (sign !== '+')
            sign = '+'

        updateScreen();
    })

    btnMinus = this.getElementById('btn-minus');
    btnMinus.addEventListener('click', function() {
        if (currentResult === 'NaN') return;

        if (equalPressed) 
            equalPressed = false;

        if (sign !== '' && toCalcNumber1 !== '' && toCalcNumber2 !== '') {
            getResult();
            toCalcNumber1 = currentResult;
            toCalcNumber2 = '';
        }
        
        if (sign !== '-')
            sign = '-'
        updateScreen();
    })
    
    btnMul = this.getElementById('btn-mul');
    btnMul.addEventListener('click', function() {
        if (currentResult === 'NaN') return;

        if (toCalcNumber1 === '' || toCalcNumber1 === '0') 
            if (!equalPressed) return;

        if (equalPressed) 
            equalPressed = false;

        if (sign !== '' && toCalcNumber1 !== '' && toCalcNumber2 !== '') {
            getResult();
            toCalcNumber1 = currentResult;
            toCalcNumber2 = '';
        }

        if (sign !== '×')
            sign = '×';
        updateScreen();
    })
    
    btnDiv = this.getElementById('btn-div');
    btnDiv.addEventListener('click', function() {
        if (currentResult === 'NaN') return;

        if (toCalcNumber1 === '' || toCalcNumber1 === '0') 
            if (!equalPressed) return;

        if (equalPressed) 
            equalPressed = false;

        if (sign !== '' && toCalcNumber1 !== '' && toCalcNumber2 !== '') {
            getResult();
            toCalcNumber1 = currentResult;
            toCalcNumber2 = '';
        }

        if (sign !== '÷')
            sign = '÷';
        updateScreen();
    })

    btnEqual = this.getElementById('btn-equal');
    btnEqual.addEventListener('click', function() {
        if (toCalcNumber1 !== '' && toCalcNumber2 !== '' && sign !== '') {
            getResult();
            updateScreen();
            equalPressed = true;
        }

        resetCommas();
    })

    for (let i = 0; i <= 9; i++) {
        numberBtns[i] = this.getElementById('btn-' + i);
        numberBtns[i].addEventListener('click', function() {
            if (equalPressed) {
                Cexecute();
            }
            
            if (toCalcNumber1 == '0' && sign === '')
                toCalcNumber1 = '';

            if (sign === '' && toCalcNumber1.length < 12)
                toCalcNumber1 += i;
            else if (sign !== '' && toCalcNumber2.length < 12 && toCalcNumber1 !== '')
                toCalcNumber2 += i;
            else if (!toCalcNumber1 && sign === '-') {
                toCalcNumber1 += -i;
                sign = '';
            }

            updateScreen();
        })
    }

    pUserInputDisplay = this.querySelector('p.user-input-display');
    pResult = this.querySelector('p#result');

    btnCE = this.getElementById('btn-CE');
    btnCE.addEventListener('click', function() {
        
        if (toCalcNumber2 && !equalPressed) {
            toCalcNumber2 = '';
            num2Commas = false;
            updateScreen();
        } else
            Cexecute();
    })

    btnC = this.getElementById('btn-C');
    btnC.addEventListener('click', Cexecute);

    btnInverse = this.getElementById('btn-inverse');
    btnInverse.addEventListener('click', function() {
        if (toCalcNumber1 !== '' && toCalcNumber2 !== '' && sign !== '') {
            getResult();
            toCalcNumber2 = '';
            sign = '';
        }
        else if (toCalcNumber1) {
            if (!toCalcNumber2) toCalcNumber2 = '';
            if (!currentResult) currentResult = parseInt(toCalcNumber1);
        }

        currentResult = (Math.round(1.0/currentResult * 1000) / 1000).toFixed(3);
        toCalcNumber1 = currentResult;
        updateScreen();
        equalPressed = true;
        resetCommas();
    })

    btnNegativeSwitch = this.getElementById('btn-negative-switch');
    btnNegativeSwitch.addEventListener('click', function() {
        if (toCalcNumber1 !== '' && toCalcNumber2 !== '' && sign !== '') {
            getResult();
            toCalcNumber2 = '';
            sign = '';
        }
        else if (toCalcNumber1) {
            if (!toCalcNumber2) toCalcNumber2 = '';
            if (!currentResult) currentResult = roundFloat(toCalcNumber1);
        }

        currentResult = -currentResult;
        toCalcNumber1 = currentResult;
        updateScreen();
        equalPressed = true;
        resetCommas();
    })

    btnCommas = this.getElementById('btn-commas');
    btnCommas.addEventListener('click', function() {
        if (sign === '' && toCalcNumber1.length < 12 && !num1Commas) {
            toCalcNumber1 += '.';
            num1Commas = true;
        }
        else if (sign !== '' && toCalcNumber2.length < 12 && toCalcNumber1 !== '' && !num2Commas) {
            toCalcNumber2 += '.';
            num2Commas = true;
        }
        else if (!toCalcNumber1 && sign === '-') {
            toCalcNumber1 += -i;
            sign = '';
        }

        updateScreen();
    })
})

function Cexecute() {
    equalPressed = false;

    toCalcNumber1 = '0';
    toCalcNumber2 = '';
    sign = '';
    currentResult = 0;
    updateScreen();
}

function resetCommas() {
    num1Commas = false;
    num2Commas = false;

}

function getResult() {
    resetCommas();

    switch (sign) {
        case '+':
            add();
            break;
        case '-':
            minus();
            break;
        case '×':
            multiply();
            break;
        case '÷':
            division();
            break;
        default:
            console.log('SOMETHING WRONG HAPPEND!')
            break;
    }

    updateScreen();
}

function updateScreen() {
    pUserInputDisplay.textContent = `${toCalcNumber1} ${sign} ${toCalcNumber2}`;

    if (countDecimalPlaces(currentResult)) //If the number is double/float, we make sure it only has 3 decimals
        currentResult = roundFloat(currentResult)
    pResult.textContent = currentResult;
}

function add() {
    currentResult = roundFloat(toCalcNumber1) + roundFloat(toCalcNumber2);
    return currentResult;
}

function minus() {
    currentResult = roundFloat(toCalcNumber1) - roundFloat(toCalcNumber2);
    return currentResult;
}

function multiply() {
    currentResult = roundFloat(toCalcNumber1) * roundFloat(toCalcNumber2);
    return currentResult;
}

function division() {
    if (parseInt(toCalcNumber2) == 0)
        currentResult = 'NaN'
    else {
        currentResult = parseFloat(toCalcNumber1) / parseFloat(toCalcNumber2);
        
        if (countDecimalPlaces(currentResult) > 3) //If the number is double/float, we make sure it only has 3 decimals
            currentResult = roundFloat(currentResult)
    }

    return currentResult;
}

function countDecimalPlaces(floatNumber) {
    // Convert the number to a string
    var numberString = floatNumber.toString();
    
    // Check if the number has a decimal point
    var decimalIndex = numberString.indexOf('.');
    
    // If there is no decimal point, return 0
    if (decimalIndex === -1) {
        return 0;
    }
    
    // Calculate the number of decimal places
    var decimalPlaces = numberString.length - decimalIndex - 1;
    
    return decimalPlaces;
}

function roundFloat(floatNumber) {
    floatNumber = (Math.round(floatNumber * 1000) / 1000).toFixed(3);
    
    let strNumber = floatNumber.toString();
    
    // Remove all the zeros from the string
    let result = strNumber.replace(/(\.\d*?[1-9])0*$/, '$1');
    
    // Parse the result back to a float
    return parseFloat(result);
}