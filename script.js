const result = document.getElementById('result');
const operation = document.getElementById('operation');
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

//------------------ NUMBER --------------------------
function number(value) {
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
    data.resultformat.push('active');
    operation.value = data.formats.join('');
    result.value = data.result;
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
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        data.result = operations[operationType](i);
        if (data.formats.length > 0 && /(ln|log|fact|√)/.test(data.formats[data.formats.length - 1])) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(formatMap[operationType](j));
            console.log(j);
        } else {
            data.formats.push(formatMap[operationType](i));
        }
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
        if (data.staging.length !== 0) {
            data.operations.push(data.staging.join(''), ')');
            data.formats.push(data.staging.join(''), ')');
            formula_str = balanceParentheses(data.operations);
            data.result = eval(formula_str.join(''));
            data.staging = [];
            operation.value = data.formats.join('');
            result.value = data.result;
        } else if (data.staging.length === 0) {
            data.operations.push(data.result, ')');
            data.formats.push(data.result, ')');
            formula_str = balanceParentheses(data.operations);
            console.log(formula_str);
            data.result = eval(formula_str.join(''));
            data.staging = [];
            operation.value = data.formats.join('');
            result.value = data.result;
        }
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
        data.staging = [];
        operation.value = data.formats.join('');
        result.value = data.result;
    } else if (data.staging.length === 0 && isNaN(parseFloat(data.operations[data.operations.length - 1])) && data.operations[data.operations.length - 1] !== ")") {
        data.operations.push('(');
        data.formats.push('(');
        data.staging = [];
        operation.value = data.formats.join('');
        result.value = data.result;
    } else if (data.staging.length === 0 && data.operations[data.operations.length - 1] === ")") {
        data.operations.push('*', '(');
        data.formats.push('×', '(');
        data.staging = [];
        operation.value = data.formats.join('');
        result.value = data.result;
    }
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
        jumlah = jumlah_open - jumlah_close;

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