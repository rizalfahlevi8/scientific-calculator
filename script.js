const result = document.getElementById('result');
const operation = document.getElementById('operation');
const buttonRadDeg = document.getElementById('toggleRadDeg');
const buttonSecond = document.getElementById('toggleSecond');
let data = {
    formats: [],
    operations: [],
    result: 0,
    resultformat: [],
    staging: []
}
console.log(data);

//------------------ CLEARDATA ------------------------
function clearData() {
    data.staging = [];
    data.result = 0;
    data.operations = [];
    data.formats = [];
    data.resultformat = [];
    operation.value = data.formats.join('');
    result.value = data.staging.join('');
    console.log(data);
}

//------------------ TOGGLE SECOND -------------------
function toggleSecond() {
    const button0 = [
        { id: 'trigonometric-sin', newFunction: 'sec', newText: 'sec' },
        { id: 'trigonometric-cos', newFunction: 'csc', newText: 'csc' },
        { id: 'trigonometric-tan', newFunction: 'cot', newText: 'cot' },
    ];
    const button1 = [
        { id: 'trigonometric-sin', newFunction: 'sin', newText: 'sin' },
        { id: 'trigonometric-cos', newFunction: 'cos', newText: 'cos' },
        { id: 'trigonometric-tan', newFunction: 'tan', newText: 'tan' },
    ];

    if (buttonSecond.value === "0") {
        button0.forEach(buttonObj => {
            const element = document.getElementById(buttonObj.id);
            element.setAttribute('onclick', `trigonometric('${buttonObj.newFunction}')`);
            element.innerText = buttonObj.newText;
        });
        buttonSecond.value = "1";
    } else {
        button1.forEach(buttonObj => {
            const element = document.getElementById(buttonObj.id);
            element.setAttribute('onclick', `trigonometric('${buttonObj.newFunction}')`);
            element.innerText = buttonObj.newText;
        });
        buttonSecond.value = "0";
    }
}

//------------------ RADIAN OR DEGREES ---------------
function toggleRadDeg() {
    if (buttonRadDeg.innerText === "rad") {
        buttonRadDeg.innerText = "deg",
            buttonRadDeg.value = "deg"
    } else {
        buttonRadDeg.innerText = "rad",
            buttonRadDeg.value = "rad"
    }
}

//------------------ NUMBER --------------------------
function number(value) {
    if(/(active)/.test(data.resultformat[data.resultformat.length - 1])){
        data.formats.pop();
    }
    data.staging.push(value);
    result.value = data.staging.join('');
    console.log(data);
}

//------------------ CONSTANT ------------------------
function constant(operationType) {
    const operations = {
        π: () => Math.PI,
        e: () => Math.E,
    };

    data.result = operations[operationType]();
    data.formats.push(operationType);
    data.resultformat = [];
    data.resultformat.push('active');
    operation.value = data.formats.join('');
    result.value = data.result;
    operation.value = data.formats.join('');
    data.staging = [];
    console.log(data);
}

//------------------ OPERATOR ------------------------
// consists of addition, subtraction, multiplication, division, and powers of numbers functions
function operator(value, format) {
    if (data.staging.length !== 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
        if (data.formats.length === 0 || (data.formats.length > 0 && !data.formats[data.formats.length - 1].includes(")"))) {
            data.operations.push(data.staging.join(''));
            data.formats.push(data.staging.join(''));
            data.staging = [];
            formula_str = balanceParentheses(data.operations);
            data.result = eval(formula_str.join(''));
            operation.value = data.formats.join('');
            result.value = data.result;
        }
    } else {
        if (data.operations.length > 0 && data.resultformat.length === 0
            && isNaN(parseFloat(data.operations[data.operations.length - 1]))
            && data.operations[data.operations.length - 1] !== "("
            && data.operations[data.operations.length - 1] !== ")"
        ) {
            data.operations.pop();
            data.formats.pop();
        } else {
            if (data.staging.length !== 0 && data.operations[data.operations.length - 1] !== ")") {
                data.operations.push(data.staging.join(''));
                data.formats.push(data.staging.join(''));
                data.result = parseFloat(data.staging.join(''));
                data.staging = [];
            } else if (data.operations[data.operations.length - 1] !== ")") {
                data.operations = data.operations.concat(data.result);
                if (data.resultformat.length === 0) {
                    data.formats = data.formats.concat(data.result);
                    result.value = data.result;
                } else {
                    data.resultformat = [];
                }
            }
        }
    }
    data.resultformat = [];
    data.operations.push(value);
    data.formats.push(format)
    operation.value = data.formats.join('');
    console.log(data);
}

//------------------ PERCENTAGE ------------------------
function percentage() {
    if (data.staging.length !== 0) {
        persent = data.staging.join('') * 0.01;
        data.staging = [];
        data.result = persent;
        result.value = data.result;
    } else if (data.result.length !== 0) {
        persent = data.result * 0.01;
        data.result = persent;
        result.value = data.result;
    }
}

//----------------- MATH FUNCTION ----------------------
// consisting of logarithms, square roots, natural logs, and factorials
function math_function(operationType) {
    const operations = {
        log: (x) => Math.log10(x),
        ln: (x) => Math.log(x),
        fact: (x) => factorialCalculation(x),
        sqrt: (x) => Math.sqrt(x)
    };

    const formatMap = {
        log: (i) => `log(${i})`,
        ln: (i) => `ln(${i})`,
        fact: (i) => `fact(${i})`,
        sqrt: (i) => `√(${i})`
    };

    if (data.staging.length !== 0) {
        i = data.staging.join('');
        data.result = operations[operationType](i);
        data.formats.push(formatMap[operationType](i));
        data.resultformat = [];
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        data.result = operations[operationType](i);
        if (data.formats.length > 0 && /(active)/.test(data.resultformat[data.resultformat.length - 1])) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(formatMap[operationType](j));
            console.log(j);
        } else {
            data.formats.push(formatMap[operationType](i));
        }
        data.resultformat = [];
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
    console.log(data);
}

function factorialCalculation(value) {
    if (value < 0) {
        return "Invalid input";
    }
    else if (value == 0) {
        return 1;
    }
    else {
        return value * factorialCalculation(value - 1);
    }
}

//------------------ TRIGONOMETRIC --------------------
function trigonometric(value) {
    const operations = {
        sin: (x) => Math.sin(x),
        cos: (x) => Math.cos(x),
        tan: (x) => Math.tan(x),
        sec: (x) => 1 / Math.cos(x),
        csc: (x) => 1 / Math.sin(x),
        cot: (x) => 1 / Math.tan(x),
    };

    const formats = {
        sin: (i, unit) => unit === 'deg' ? `sin₀(${i})` : `sinᵣ(${i})`,
        cos: (i, unit) => unit === 'deg' ? `cos₀(${i})` : `cosᵣ(${i})`,
        tan: (i, unit) => unit === 'deg' ? `tan₀(${i})` : `tanᵣ(${i})`,
        sec: (i, unit) => unit === 'deg' ? `sec₀(${i})` : `secᵣ(${i})`,
        csc: (i, unit) => unit === 'deg' ? `csc₀(${i})` : `cscᵣ(${i})`,
        cot: (i, unit) => unit === 'deg' ? `cot₀(${i})` : `cotᵣ(${i})`,
    };

    if (data.staging.length !== 0) {
        let angleInRadians = buttonRadDeg.value === 'deg' ? data.staging.join('') * (Math.PI / 180) : data.staging.join('');
        data.result = operations[value](angleInRadians);
        data.formats.push(formats[value](data.staging.join(''), buttonRadDeg.value));
        data.resultformat = [];
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
    } else if (data.result !== 0 || data.result === 0) {
        let i = data.result;
        let angleInRadians = buttonRadDeg.value === 'deg' ? data.result * (Math.PI / 180) : data.result;
        data.result = operations[value](angleInRadians);
        if (data.formats.length > 0 && /(active)/.test(data.resultformat[data.resultformat.length - 1])) {
            let j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(formats[value](j, buttonRadDeg.value));
        } else {
            data.formats.push(formats[value](i, buttonRadDeg.value));
        }
        data.resultformat = [];
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
}

//----------------- CALCULATE --------------------------
function calculate() {
    if (data.operations[data.operations.length - 1] !== ")") {
        if (data.staging.length !== 0) {
            data.operations = data.operations.concat(data.staging);
            data.formats = data.formats.concat(data.staging);
        } else {
            data.operations = data.operations.concat(data.result);
            if (data.resultformat.length === 0) {
                data.formats = data.formats.concat(data.result);
            } else {
                data.resultformat = [];
            }
        }
    }
    data.staging = [];
    formula_str = balanceParentheses(data.operations);
    try {
        data.result = eval(formula_str.join(''));
        data.operations.push('=');
        data.formats.push('=');
        operation.value = data.formats.join('');
        result.value = data.result;
        data.operations = [];
        data.formats = [];
    } catch (error) {
        if (error instanceof SyntaxError) {
            result.value = "Syntax Error!"
            return;
        }
    }
    console.log(data)
}

//disable calculate button
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", function () {
        if (button.id === "calculate") {
            button.disabled = true;
        } else {
            document.getElementById("calculate").disabled = false;
        }
    });
});

//------------------ PARENTHESES CLOSE ---------------------
function parenthesesClose() {
    let jumlah_open = data.operations.filter(function (item) {
        return item === "(";
    }).length;
    let jumlah_close = data.operations.filter(function (item) {
        return item === ")";
    }).length;
    jumlah = jumlah_open - jumlah_close;

    if (jumlah > 0) {
        if (/(active)/.test(data.resultformat[data.resultformat.length - 1])) {
            data.operations.push(data.result, ')');
            data.formats.push(')');
            let formula_str = balanceParentheses(data.operations);
            data.result = eval(formula_str.join(''));
        } else if (data.staging.length !== 0) {
            data.operations.push(data.staging.join(''), ')');
            data.formats.push(data.staging.join(''), ')');
            let formula_str = balanceParentheses(data.operations);
            data.result = eval(formula_str.join(''));
        } else if (data.staging.length === 0) {
            data.operations.push(data.result, ')');
            data.formats.push(data.result, ')');
            let formula_str = balanceParentheses(data.operations);
            data.result = eval(formula_str.join(''));
        }
        data.staging = [];
        data.resultformat = [];
        operation.value = data.formats.join('');
        result.value = data.result;
    }
    console.log(data);
}

//------------------ PARENTHESES OPEN ----------------------
function parenthesesOpen() {
    if (data.staging.length !== 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
        data.operations.push(data.staging.join(''), '*', '(');
        data.formats.push(data.staging.join(''), '×', '(');
        formula_str = balanceParentheses(data.operations);
        data.result = eval(formula_str.join(''));
    } else if (data.staging.length === 0 && /(active)/.test(data.resultformat[data.resultformat.length - 1])) {
        data.operations.push(data.result, '*', '(');
        data.formats.push('×', '(');
    } else if (data.staging.length === 0 && data.operations[data.operations.length - 1] === ")") {
        data.operations.push('*', '(');
        data.formats.push('×', '(');
    } else if (data.staging.length === 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
        data.operations.push('(');
        data.formats.push('(');
    }
    data.staging = [];
    data.resultformat = [];
    operation.value = data.formats.join('');
    result.value = data.result;

    console.log(data);
}

function balanceParentheses(value) {
    data_temporary = [...value];
    if (!Array.isArray(data_temporary)) {
        console.error("The data received is not an array");
        return;
    }

    if (data_temporary.length !== 0) {
        let jumlah_open = data_temporary.filter(function (item) {
            return item === "(";
        }).length;
        let jumlah_close = data_temporary.filter(function (item) {
            return item === ")";
        }).length;
        let jumlah = jumlah_open - jumlah_close;

        if (isNaN(parseFloat(data_temporary[data_temporary.length - 1])) && !data_temporary[data_temporary.length - 1].includes(")")) {
            data_temporary.push(1);
            for (let i = 0; i <= jumlah - 1; i++) {
                data_temporary.push(')');
            }
        } else {
            for (let i = 0; i <= jumlah - 1; i++) {
                data_temporary.push(')');
            }
        }
    }
    return data_temporary;
}