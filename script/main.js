let toCalcNumber1 = ''; num1Commas = false;
let toCalcNumber2 = ''; num2Commas = false;
let sign = ''
let currentResult = 0;

let equalPressed = false;

let pUserInputDisplay, pResult;

document.addEventListener('DOMContentLoaded', function() {

    let numberBtns = []
    let btnAdd, btnMinus, btnMul, btnDiv, btnEqual;
    let btnCE, btnC, btnInverse, btnNegativeSwitch, btnCommas;

    btnAdd = this.getElementById('btn-add');
    btnMinus = this.getElementById('btn-minus');
    btnMul = this.getElementById('btn-mul');
    btnDiv = this.getElementById('btn-div');
    pUserInputDisplay = this.querySelector('p.user-input-display');
    pResult = this.querySelector('p#result');

    btnAdd.addEventListener('click', () => SignHandle('+'))
    btnMinus.addEventListener('click', () => SignHandle('-'))
    btnMul.addEventListener('click', () => SignHandle('*'))
    btnDiv.addEventListener('click', () => SignHandle('/'));

    btnEqual = this.getElementById('btn-equal');
    btnEqual.addEventListener('click', GetEqual);

    for (let i = 0; i <= 9; i++) {
        numberBtns[i] = this.getElementById('btn-' + i);
        numberBtns[i].addEventListener('click', () => numberHandle(i));
    }

    btnCE = this.getElementById('btn-CE');
    btnCE.addEventListener('click', CE)

    btnC = this.getElementById('btn-C');
    btnC.addEventListener('click', Cexecute);

    btnInverse = this.getElementById('btn-inverse');
    btnInverse.addEventListener('click', Inverse)

    btnNegativeSwitch = this.getElementById('btn-negative-switch');
    btnNegativeSwitch.addEventListener('click', NegativeSwitch)

    btnCommas = this.getElementById('btn-commas');
    btnCommas.addEventListener('click', Commas);
})