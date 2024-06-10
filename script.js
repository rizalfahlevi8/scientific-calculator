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
    data.result = 0; // Ubah menjadi 0 daripada []
    data.operations = [];
    data.formats = [];
    data.resultformat = [];
    operation.value = data.formats.join('');
    result.value = data.staging.join('');
    console.log(data);
}

//------------------ NUMBER --------------------------
function number(value) {
    data.staging = [];
    data.staging.push(value);
    result.value = data.staging.join('');
    console.log(data);
}

//------------------ OPERATOR ------------------------
function operator(value, format) {
    if (data.staging.length !== 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
        // Jika staging tidak kosong dan nilai terakhir dari operations bukan angka
        if (data.formats.length === 0 || (data.formats.length > 0 && !data.formats[data.formats.length - 1].includes(")"))) {
            data.operations.push(data.staging.join('')); // Tambahkan nilai staging ke operasi
            data.formats.push(data.staging.join(''));
            data.staging = []; // Kosongkan staging setelah ditambahkan ke operasi
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
            data.operations.pop(); // Hapus operator terakhir jika ada
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

//------------------ LOGARITMA ------------------------
function logaritma() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        log = Math.log10(data.staging.join(''));
        data.result = log;
        data.formats.push(`log(${i})`);
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        log = Math.log10(data.result);
        data.result = log;
        if (data.formats.length > 0 && /(ln|log|fact)/.test(data.formats[data.formats.length - 1])) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(`log(${j})`);
            console.log(j);
        } else {
            data.formats.push(`log(${i})`);
        }
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        console.log(log);
    }
}

//------------------ LOGNATURAL ------------------------
function logNatural() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        ln = Math.log(data.staging.join(''));
        data.result = ln;
        data.formats.push(`ln(${i})`);
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        ln = Math.log(data.result);
        data.result = ln;
        if (data.formats.length > 0 && /(ln|log|fact)/.test(data.formats[data.formats.length - 1])) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(`ln(${j})`);
            console.log(j);
        } else {
            data.formats.push(`ln(${i})`);
        }
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
    console.log(data);
}

//------------------ SQUAREROOT ------------------------
function squareRoot() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        sqrt = Math.sqrt(data.staging.join(''));
        data.result = sqrt;
        data.formats.push(`√(${i})`);
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        sqrt = Math.sqrt(data.result);
        data.result = sqrt;
        if (data.formats.length > 0 && data.formats[data.formats.length - 1].includes("√")) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(`√(${j})`);
            console.log(j);
        } else {
            data.formats.push(`√(${i})`);
        }
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
}

//------------------ FACTORIAL ------------------------
function factorial() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        fact = factorialCalculation(data.staging.join(''));
        data.result = fact;
        data.formats.push(`fact(${i})`);
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        fact = factorialCalculation(data.result);
        data.result = fact;
        if (data.formats.length > 0 && /(ln|log|fact)/.test(data.formats[data.formats.length - 1])) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(`fact(${j})`);
        } else {
            data.formats.push(`fact(${i})`);
        }
        data.resultformat.push('active');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
}

function factorialCalculation(value) {
    let result = 1;
    for (let i = 2; i <= value; i++) {
        result *= i;
    }
    return result;
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
    } else if (data.staging.length === 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
        data.operations.push('(');
        data.formats.push('(');
        data.staging = [];
        operation.value = data.formats.join('');
        result.value = data.result;
    }
    console.log(data);
}

function balanceParentheses(value) {
    data_temporary = [...value];
    if (!Array.isArray(data_temporary)) {
        console.error("Data yang diterima bukan array");
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