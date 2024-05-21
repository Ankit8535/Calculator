let runningTotal = 0;
let buffer = "0";
let previousOperator = null; 
const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (!isNaN(parseInt(value))) {
        handleNumber(value);
    } else {
        handleSymbol(value);
    }
    rerender();
}

function handleNumber(value) {
    if (buffer === "0" || buffer === "Error") { 
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (previousOperator !== null) {
        flushOperation(intBuffer);
    } else {
        runningTotal = intBuffer;
    }
    previousOperator = value;
    buffer = "0";
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case "+":
            runningTotal += intBuffer;
            break;
        case "-":
            runningTotal -= intBuffer;
            break;
        case "×":
            runningTotal *= intBuffer;
            break;
        case "÷":
            if (intBuffer === 0) {
                buffer = "Error"; 
                runningTotal = 0;
                previousOperator = null;
                return;
            }
            runningTotal /= intBuffer;
            break;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); 
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1 || buffer === "Error") { 
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}

function rerender() {
    screen.innerText = buffer;
}

function init() {
    document.querySelector(".calc-buttons").addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    });
}

init();
