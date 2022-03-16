let num1 = "";
let num2 = "";
let sameNum = [];
let op = "";
let disNum = "";
let addNum = true;


const calc = {
    "+": function (num1, num2) { return parseInt(num1) + parseInt(num2) },
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
    number()
    operator();
    numFloat();
    negate();
    equiv();
    backspace();
    clears();
}

function number() {
    document.querySelectorAll("button.numbers").forEach(function (nums) {
        nums.addEventListener("click", function () {
            (addNum == true && disNum !== 0) ? disNum += nums.textContent : disNum = nums.textContent;
            addNum = true;
            document.getElementById("curNum").textContent = disNum;
        });
    });
}

function operator() {
    document.querySelectorAll("button.operators").forEach(function (ops) {
        ops.addEventListener("click", function () {
            if (num1 === "") {
                num1 = disNum;
                op = ops.textContent
            }
            else if (sameNum.length > 0) {
                num1 = disNum;
            }
            else if (num1 !== "" && addNum == false) {
                op = ops.textContent
            } else if (num1 !== "" && disNum == "") {
                disNum = num1
                op = ops.textContent
            }
            else if (num1 !== "" && disNum !== "") {
                num2 = disNum;
                num1 = calc[op](num1, num2);
                disNum = num1;
                op = ops.textContent
            }
            addNum = false;
            sameNum.pop()
            document.getElementById("curNum").textContent = disNum;
            document.getElementById("elog").textContent = num1 + op;
            document.getElementById("decimal").disabled = false;
            console.log(num1);
            console.log(num2);
            console.log(disNum);
        })
    });
}

function numFloat() {
    document.getElementById("decimal").addEventListener("click", function () {
        if (!disNum.includes(".")) {
            disNum += ".";
        }
        document.getElementById("curNum").textContent = disNum

    })
}

function negate() {
    document.getElementById("negative").addEventListener("click", function () {
        disNum = calc["*"](disNum, -1);
        document.getElementById("curNum").textContent = disNum
    })
}

function equiv() {
    document.getElementById("equal").addEventListener("click", function () {
        if (op === "") {
            document.getElementById("elog").textContent = num1 + op + num2;
            num1 = disNum;
        } else if (num1 !== "" && disNum !== "" && addNum == false) {
            sameNum.push(disNum)
            sameNum.length = 1;
            num1 = disNum;
            disNum = calc[op](num1, sameNum[0]);
            document.getElementById("elog").textContent = num1 + op + sameNum[0];
        }
        else {
            num2 = disNum;
            document.getElementById("elog").textContent = num1 + op + num2;
            num1 = calc[op](num1, num2);
            disNum = num1;
            op = ""
        }
        addNum = false
        document.getElementById("curNum").textContent = disNum
    })
}

function backspace() {
    document.getElementById("backspace").addEventListener("click", function () {
        if (addNum == true) {
            disNum = String(disNum).slice(0, -1)
            document.getElementById("curNum").textContent = disNum;
        }
    })
}

function clears() {
    document.getElementById("clear").addEventListener("click", function () {
        num1 = "";
        num2 = "";
        op = "";
        disNum = ""
        addNum = true;
        sameNum.pop();
        document.getElementById("curNum").textContent = disNum;
        document.getElementById("elog").textContent = num1 + op
        document.getElementById("error").textContent = ""
    });
}

display();
