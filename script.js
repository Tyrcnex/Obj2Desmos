let inputObj = document.getElementById('inputObj');
let outputDesmos = document.getElementById('outputDesmos');
let convertButton = document.getElementById('convert');

convertButton.onclick = function() {
    outputDesmos.value = obj2Desmos(inputObj.value);
}