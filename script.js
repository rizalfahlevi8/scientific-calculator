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

function clearData() {
    data.staging = [];
    data.result = 0; // Ubah menjadi 0 daripada []
    data.operations = [];
    data.formats = [];
    operation.value = data.formats.join('');
    result.value = data.staging.join('');
    console.log(data);
}


function number(value) {
    data.staging.push(value);
    result.value = data.staging.join('');
    console.log(data);
}

function operator(value, format) {
    if (data.staging.length !== 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
        // Jika staging tidak kosong dan nilai terakhir dari operations bukan angka
        data.operations.push(data.staging.join('')); // Tambahkan nilai staging ke operasi
        data.formats.push(data.staging.join(''));
        data.staging = []; // Kosongkan staging setelah ditambahkan ke operasi
        formula_str = data.operations.join('');
        data.result = eval(formula_str);
        operation.value = data.formats.join('');
        result.value = data.result;
    } else {
        if (data.operations.length > 0 && data.resultformat.length === 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))) {
            data.operations.pop(); // Hapus operator terakhir jika ada
            data.formats.pop();
        } else {
            if (data.staging.length !== 0) {
                data.operations.push(data.staging.join(''));
                data.formats.push(data.staging.join(''));
                data.result = parseFloat(data.staging.join(''));
                data.staging = [];
            } else {
                data.operations = data.operations.concat(data.result);
                if (data.resultformat.length === 0) {
                    data.formats = data.formats.concat(data.result);
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


function calculate() {
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
    data.staging = [];
    formula_str = data.operations.join('');
    try {
        data.result = eval(formula_str);
        data.operations.push('=');
        data.formats.push('=');
        operation.value = data.formats.join('');
        result.value = data.result;
        data.operations = [];
        data.formats = [];
    } catch (error) {
        if (error instanceof SyntaxError) {
            result = "Syntax Error!"
            return;
        }
    }
    console.log(data)
}

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

function logaritma() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        log = Math.log10(data.staging.join(''));
        data.result = log;
        data.formats.push(`log(${i})`);
        data.resultformat.push('aktif');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        log = Math.log10(data.result);
        data.result = log;
        if (data.formats.length > 0 && data.formats[data.formats.length - 1].includes("log")) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(`log(${j})`);
            console.log(j);
        } else {
            data.formats.push(`log(${i})`);
        }
        data.resultformat.push('aktif');
        result.value = data.result;
        operation.value = data.formats.join('');
        console.log(log);
    }
}

function logNatural() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        ln = Math.log(data.staging.join(''));
        data.result = ln;
        data.formats.push(`ln(${i})`);
        data.resultformat.push('aktif');
        result.value = data.result;
        operation.value = data.formats.join('');
        data.staging = [];
        console.log(data);
    } else if (data.result !== 0 || data.result === 0) {
        i = data.result;
        ln = Math.log(data.result);
        data.result = ln;
        if (data.formats.length > 0 && data.formats[data.formats.length - 1].includes("ln")) {
            j = data.formats[data.formats.length - 1];
            data.formats.pop();
            data.formats.push(`ln(${j})`);
            console.log(j);
        } else {
            data.formats.push(`ln(${i})`);
        }
        data.resultformat.push('aktif');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
}

function squareRoot() {
    if (data.staging.length !== 0) {
        i = data.staging.join('');
        sqrt = Math.sqrt(data.staging.join(''));
        data.result = sqrt;
        data.formats.push(`√(${i})`);
        data.resultformat.push('aktif');
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
        data.resultformat.push('aktif');
        result.value = data.result;
        operation.value = data.formats.join('');
    }
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