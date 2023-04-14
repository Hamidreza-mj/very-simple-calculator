const resultText = document.getElementById('result');
const errorMsg = 'Error!';

function clearResult() {
    resultText.innerText = '';
}

function back() {
    let result = resultText.innerText;
    resultText.innerText = result.substring(0, result.length - 1);
}

function parseMath(str) {
    return Function(`return ${str}`)();
}

function strContainsNumber(str) {
    return Boolean(str.match(/\d/));
}

function addSymbol(symbol) {
    if (resultText.innerText == errorMsg)
        clearResult();

    let canBeAdded = false;

    if (isNaN(symbol)) {
        //the entry is not number

        // + -> first of num
        // - -> first of num
        // . -> first of num & only one in expression

        //is first entry
        if (resultText.innerText.length == 0) {
            switch (symbol) {
                case '+':
                case '-':
                case '.':
                    canBeAdded = true;
                    break;
            }
        } else {
            //after first entry
            let previousChar = resultText.innerText.at(-1);

            if (isNaN(previousChar)) {
                //previous char is not number

                //2*-2
                if (symbol == '-' || symbol == '.') {
                    canBeAdded = true;
                } else {
                    canBeAdded = false;
                }
            } else {
                //previous char is number
                // if (symbol == '.') {
                //     resultText.innerText.includes('.')

                //     canBeAdded = false;
                // } else {
                canBeAdded = true;
                // }
            }
        }

    } else {
        //the entry is number
        canBeAdded = true;
    }

    if (canBeAdded)
        resultText.innerText += symbol
}

function calculate() {
    let currentValue = resultText.innerText;

    if (!strContainsNumber(currentValue)) {
        clearResult();
        return;
    }

    let resultOfCalculate = 0;

    try {
        resultOfCalculate = parseMath(currentValue);
    } catch (error) {
        resultOfCalculate = errorMsg;
    }

    resultText.innerText = resultOfCalculate;
}