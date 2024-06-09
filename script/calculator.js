function numberHandle(num) {
    if (equalPressed) {
        Cexecute();
    }
    
    if (toCalcNumber1 == '0' && sign === '')
        toCalcNumber1 = '';

    if (sign === '' && toCalcNumber1.length < 12)
        toCalcNumber1 += num;
    else if (sign !== '' && toCalcNumber2.length < 12 && toCalcNumber1 !== '')
        toCalcNumber2 += num;
    else if (!toCalcNumber1 && sign === '-') {
        toCalcNumber1 += -num;
        sign = '';
    }

    updateScreen();
}

function SignHandle(inputSign) {
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

    switch (inputSign) {
        case '+':
            if (sign !== '+')
                sign = '+';
            break;
        case '-':
            if (sign !== '-')
                sign = '-';
            break;
        case '*':
            if (sign !== '×')
                sign = '×';
            break;
        case '/':
            if (sign !== '÷')
                sign = '÷';
            break;
        }

    updateScreen();
}


function GetEqual() {
    if (toCalcNumber1 !== '' && toCalcNumber2 !== '' && sign !== '') {
        getResult();
        updateScreen();
        equalPressed = true;
    }

    resetCommas();
}

function CE() {
            
    if (toCalcNumber2 && !equalPressed) {
        toCalcNumber2 = '';
        num2Commas = false;
        updateScreen();
    } else
        Cexecute();
}

function Inverse() {
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
}

function NegativeSwitch() {
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
}

function Commas() {
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
}

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

function updateScreen() {
    pUserInputDisplay.textContent = `${toCalcNumber1} ${sign} ${toCalcNumber2}`;

    if (countDecimalPlaces(currentResult)) //If the number is double/float, we make sure it only has 3 decimals
        currentResult = roundFloat(currentResult)
    pResult.textContent = currentResult;
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