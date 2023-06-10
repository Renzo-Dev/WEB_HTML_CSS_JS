let runningTotal = 0; // текущий результат вычисления
let buffer = "0";  // буфер
let previousOperation;   // операция

const screen = document.querySelector('.screen');

function buttonClick(value) {
    // если значение символ
    if (isNaN(value)) {
        // обрабатываем что за символ
        handleSymbol(value);
    } else {
        // если цифра
        // добавляем её в строку ( массив )
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': {
            buffer = '0';
            runningTotal = 0;
            break;
        }
        case '=': {
            if (previousOperation === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperation = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        }
        case '←': {
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        }
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperation = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperation === '+') {
        runningTotal += intBuffer;
    } else if (previousOperation === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperation === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperation === '÷') {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').
    addEventListener('click', function (event) {
        buttonClick(event.target.innerText);

        console.log(screen.innerText)
    })
}

init();