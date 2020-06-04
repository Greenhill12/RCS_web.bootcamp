$(document).function(main);

const innerCont = document.querySelector('main');
const minElCount = document.getElementById('min-count');
const maxElCount = document.getElementById('max-count');
const colorPicker = document.getElementById('box-color');
let maxCount = 20;
let lastBoxId = 0;
const MAX = 100;
const MIN = 0;

function main() {
    addEventHandlers();
    maxElCount.onchange = onMaxChange;
    maxElCount.oninput = (ev) => console.log("Fires while changing",ev.target.value);
    // createElements(4);
}

function addEventHandlers() {
    document.getElementById('btn-id-add-many').onclick = addManyElements;
    document.getElementById('btn-id-clear').onclick = deleteElements;

    //with addEventListener I can attach multiple functions to same event
    colorPicker.addEventListener('change', () => console.log("Color changing"));
    colorPicker.addEventListener('change', (ev) => console.log("Color changing to", ev.target.value));
    colorPicker.addEventListener('change', onColorChange);

}

function onColorChange(event) {
      
}

function addElement(parent, tag, id, classList, content) {
    const newEl = document.createElement(tag);
    if (id !== null) newEl.id = id;
    newEl.classList.add(...classList);
    newEl.innerText = content;
    parent.appendChild(newEl);
}

function addManyElements() {    
    console.log('Adding many elements');
    for (let i = 0; i < maxCount; i++) {
        lastBoxId++;
        const id = 'b-id-' + lastBoxId;
        const classList = ['box'];
        if (i % 2 === 0) {
            classList.push('red-box');
        } else {
            classList.push('green-box')
        }
        addElement(innerCont, 'div', id, classList, lastBoxId);
    }
}

function deleteElements() {
    console.log('Deleting elements');
    lastBoxId = 0;
    while (innerCont.firstChild) {
        innerCont.removeChild(innerCont.firstChild);
    }
}

function onMaxChange() {
    const tvalue = parseInt(maxElCount.value);
    //sanity check
    if (tvalue > MAX || tvalue < MIN) return;

    maxCount = tvalue ;

}

// function createElements(elementCount) {
//     console.log("Started createElements function");
//     for (let i; i < elementCount; i++) {
//         let square = document.createElement("DIV");
//         square.innerHTML(i+1);
//         document.body.appendChild(square);
        
//     }
// }

main()