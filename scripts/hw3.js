$(document).ready(main);

function main() {
    console.log("main function started!");

    const elInnerCont = document.querySelector("main");
    const elBtnCreate = document.getElementById("btn-id-create");
    const elBtnDelete = document.getElementById("btn-id-clear");
    let elFieldFizz = document.getElementById("fizz");
    let elFieldBuzz = document.getElementById("buzz");

    let elFieldMax = document.getElementById("max-count");
    let elFieldMin = document.getElementById("min-count");

    addEventHandlers(elBtnCreate, elBtnDelete, elInnerCont, elFieldMin, elFieldMax, elFieldFizz, elFieldBuzz);
}

function addEventHandlers(btnCreate, btnDelete, innerCont, fieldMin, fieldMax, fieldFizz, fieldBuzz) {
    const BOX_MIN = 0;
    const BOX_MAX = 100;
    const FIZZ_BUZZ_MIN = 0;
    const FIZZ_BUZZ_MAX = 10;
    let lastBoxId = 0;

    btnCreate.addEventListener("click", function () {
        valueCheck(innerCont, fieldFizz, fieldBuzz, fieldMin, fieldMax, BOX_MIN, BOX_MAX, lastBoxId);
        disableButton(btnCreate, lastBoxId);
    });
    btnDelete.addEventListener("click", function () {
        deleteElements(innerCont, lastBoxId);
        disableButton(btnCreate, lastBoxId);
    });
    fieldMax.addEventListener("change", function () {
        onValueChange(fieldMax, BOX_MIN, BOX_MAX);
    });
    fieldMin.addEventListener("change", function () {
        onValueChange(fieldMin, BOX_MIN, BOX_MAX);
    });
    fieldFizz.addEventListener("change", function () {
        onValueChange(fieldFizz, FIZZ_BUZZ_MIN, FIZZ_BUZZ_MAX);
    });
}

function addElement(parent, tag, id, classList, content) {
    const newEl = document.createElement(tag);
    if (id !== null) newEl.id = id;
    newEl.classList.add(...classList);
    newEl.innerText = content;
    parent.appendChild(newEl);
}

function IsFizzBuzz(lastId, fizz, buzz) {
    let isFizzBuzz = false;
    const maxOfFizzBuzz = Math.max(fizz.value, buzz.value);
    const minOfFizzBuzz = Math.min(fizz.value, buzz.value);
    if (lastId % (fizz.value * buzz.value) === 0) {
        isFizzBuzz = true;
    }
    if (maxOfFizzBuzz % minOfFizzBuzz === 0 && lastId % maxOfFizzBuzz === 0) {
        isFizzBuzz = true;
    }
    return isFizzBuzz;
}

function valueCheck(innerCont, fieldFizz, fieldBuzz, fieldMin, fieldMax, BOX_MIN, BOX_MAX, lastBoxId) {
    let minValue = parseInt(fieldMin.value);
    let maxValue = parseInt(fieldMax.value);
    if (minValue > maxValue) {
        alert(`WRONG INPUT!
        Will be created boxes from ${BOX_MIN + 1} till ${BOX_MAX}.`);
        fieldMin.value = minValue = BOX_MIN + 1;
        fieldMax.value = maxValue = BOX_MAX;
    }
    createElements(innerCont, fieldFizz, fieldBuzz, minValue, maxValue, lastBoxId);
}

function createElements(innerCont, fizz, buzz, min, max) {
    lastBoxId = min - 1;
    for (let i = min; i <= max; i++) {
        lastBoxId++;
        let addedText = lastBoxId;
        const id = "b-id-" + lastBoxId;
        const classList = ["box"];
        const isFizzBuzz = IsFizzBuzz(lastBoxId, fizz, buzz);

        if (isFizzBuzz) {
            classList.push("box-fizz-buzz");
            addedText = lastBoxId + " FIZZBUZZ";
        } else if ((lastBoxId % fizz.value === 0 || lastBoxId % buzz.value === 0) && lastBoxId % (fizz.value * buzz.value) !== 0) {
            if (lastBoxId % fizz.value !== 0) {
                classList.push("box-buzz");
                addedText = lastBoxId + " BUZZ";
            } else {
                classList.push("box-fizz");
                addedText = lastBoxId + " FIZZ";
            }
        } else {
            classList.push("box-normal");
        }
        addElement(innerCont, "div", id, classList, addedText);
    }
}

function deleteElements(innerCont) {
    lastBoxId = 0;
    while (innerCont.firstChild) {
        innerCont.removeChild(innerCont.firstChild);
    }
}

function onValueChange(checkField, minValue, maxValue) {
    let value = parseInt(checkField.value);
    let returnValue = value;
    let myAlert = `WRONG INPUT!
    Entered number should be between ${minValue + 1} and ${maxValue}!
    Number is set to `;

    //sanity check
    if (value > maxValue || value <= minValue) {
        if (value > maxValue) {
            returnValue = maxValue;
            myAlert += `${maxValue}.`;
        } else {
            returnValue = minValue + 1;
            myAlert += `${minValue + 1}.`;
        }
        checkField.value = returnValue;
        alert(myAlert);
    }
}

function disableButton(btnCreate) {
    if (lastBoxId !== 0) {
        btnCreate.setAttribute("disabled", "");
    } else {
        btnCreate.removeAttribute("disabled", "");
    }
}
