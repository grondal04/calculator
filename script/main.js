
var numberBtns = []
var btnAdd, btnMinus, btnMul, btnDiv, btnEqual;
var btnCE, btnC;

var toCalcNumber1 = ''
var toCalcNumber2 = ''
var sign = ''
var currentResult = 0;

let equalPressed = false;

var pUserInputDisplay, pResult;

document.addEventListener('DOMContentLoaded', function() {
    btnAdd = this.getElementById('btn-add');
    btnAdd.addEventListener('click', function() {
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
    })

    for (let i = 0; i <= 9; i++) {
        numberBtns[i] = this.getElementById('btn-' + i);
        numberBtns[i].addEventListener('click', function() {
            if (equalPressed) {
                Cexecute();
            }
            
            if (toCalcNumber1 == '0')
                toCalcNumber1 = '';

            if (sign === '' && toCalcNumber1.length < 12)
                toCalcNumber1 += i;
            else if (sign !== '' && toCalcNumber2.length < 12)
                toCalcNumber2 += i;

            updateScreen();
        })
    }

    pUserInputDisplay = this.querySelector('p.user-input-display');
    pResult = this.querySelector('p#result');

    btnCE = this.getElementById('btn-CE');
    btnCE.addEventListener('click', function() {
        
        if (toCalcNumber2 && !equalPressed) {
            toCalcNumber2 = '';
            updateScreen();
        } else
            Cexecute();
    })

    btnC = this.getElementById('btn-C');
    btnC.addEventListener('click', Cexecute)
})

function Cexecute() {
    equalPressed = false;

    toCalcNumber1 = '0';
    toCalcNumber2 = '';
    sign = '';
    currentResult = 0;

    updateScreen();
}

function getResult() {
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
    pResult.textContent = currentResult;
}

function add() {
    currentResult = parseInt(toCalcNumber1) + parseInt(toCalcNumber2);
    return currentResult;
}

function minus() {
    currentResult = parseInt(toCalcNumber1) - parseInt(toCalcNumber2);
    return currentResult;
}

function multiply() {
    currentResult = parseInt(toCalcNumber1) * parseInt(toCalcNumber2);
    return currentResult;
}

function division() {
    if (parseInt(toCalcNumber2) == 0)
        currentResult = 'NaN'
    else 
        currentResult = parseInt(toCalcNumber1) / parseInt(toCalcNumber2);

    currentResult = (Math.round(currentResult * 1000) / 1000).toFixed(3);

    return currentResult;
}