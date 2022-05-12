let num1 = "";
let num2 = "";
let op = "";
let disNum = "";
let addNum = true;

document.getElementById("decimal").addEventListener("click", numFloat);
document.getElementById("negative").addEventListener("click", negate);
document.getElementById("equal").addEventListener("click", equiv);
document.getElementById("backspace").addEventListener("click", backspace);
document.getElementById("clear").addEventListener("click", clears);

const calc = {
    "+": function (num1, num2) { return parseFloat(num1) + parseFloat(num2) },
    "-": function (num1, num2) { return num1 - num2 },
    "*": function (num1, num2) { return num1 * num2 },
    "/": function (num1, num2) {
        if (num2 == "0") {
            document.getElementById("error").textContent = "Cannot Divide By Zero!"
            return num1 = "", num2 = "", disNum = ""
        } else {
            return num1 / num2
        }
    }
};

function display() {
    document.getElementById("curNum").textContent = 0;
}

function number(nums) {
    (addNum == true && disNum !== 0) ? disNum += nums : disNum = nums;
    addNum = true;
    document.getElementById("curNum").textContent = disNum;
}

function operator(x) {
    if (num1 === "") {
        num1 = disNum;
        op = x;
    }
    else if (num1 !== "" && addNum == false) {
        num1 = disNum
        op = x;
    } else if (num1 !== "" && disNum == "") {
        disNum = num1  
        op = x;
    }
    else if (num1 !== "" && disNum !== "") {
        num2 = disNum;
        num1 = calc[op](num1, num2);
        disNum = num1;
        op = x;
    }
    addNum = false;
    document.getElementById("curNum").textContent = disNum;
    document.getElementById("elog").textContent = num1 + op;
    document.getElementById("decimal").disabled = false;
}

function numFloat() {
    if (!disNum.includes(".")) {
        disNum += ".";
    }
    document.getElementById("curNum").textContent = disNum
}

function negate() {
    disNum = calc["*"](disNum, -1);
    document.getElementById("curNum").textContent = disNum
}

function equiv() {
    if (op == "") {
        num1 = disNum;
        document.getElementById("elog").textContent = num1 + op + num2;
    } else if (num1 !== "" && disNum !== "" && addNum == false) {
        num1 = disNum;
        disNum = calc[op](num1, num2);
        document.getElementById("elog").textContent = num1 + op + num2;
    }
    else {
        num2 = disNum;
        document.getElementById("elog").textContent = num1 + op + num2;
        num1 = calc[op](num1, num2);;
        disNum = num1;
    }
    addNum = false
    document.getElementById("curNum").textContent = disNum
}

function backspace() {
    if (addNum == true) {
        disNum = String(disNum).slice(0, -1)
        document.getElementById("curNum").textContent = disNum;
    }
}

function clears() {
    num1 = "";
    num2 = "";
    op = "";
    disNum = ""
    addNum = true;
    display()
    document.getElementById("elog").textContent = num1 + op
    document.getElementById("error").textContent = ""
}

document.addEventListener("keydown", function (event) {
    const keyName = event.key;
    if (keyName >= 0 || keyName < 10) {
        number(keyName)
    }
    if (keyName == "+" || keyName == "-" || keyName == "*" || keyName == "/")
        operator(keyName)
    if (keyName == ".") {
        numFloat();
    }
    if (keyName == "F9") {
        negate();
    }
    if (keyName == "Enter") {
        equiv();
    }
    if (keyName == "Backspace") {
        backspace();
    }
    if (keyName == "Escape") {
        clears();
    }
})

document.querySelectorAll("button.numbers").forEach(function (nums) {
    nums.addEventListener("click", function () {
        number(nums.textContent);
    })
})

document.querySelectorAll("button.operators").forEach(function (ops) {
    ops.addEventListener("click", function () {
        operator(ops.textContent)
    })
})



display();
