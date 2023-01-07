let scrollDown = document.getElementById('scrollDown');

let inputObj = document.getElementById('inputObj');
let inputMtl = document.getElementById('inputMtl');
let outputDesmos = document.getElementById('outputDesmos');
let convertButton = document.getElementById('convert');

convertButton.onclick = function() {
    let output = obj2Desmos(inputObj.value);
    if (inputMtl.value.includes('newmtl')) output += `\n${mtl2Desmos(inputMtl.value, inputObj.value)}`
    outputDesmos.value = output;
}

window.onscroll = function(e) {
    if (document.documentElement.scrollTop > 20) {
        scrollDown.style.opacity = '0';
    } else {
        scrollDown.style.opacity = '1';
    }
}