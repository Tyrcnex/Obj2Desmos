let inputObj = document.getElementById('inputObj');
let inputMtl = document.getElementById('inputMtl');
let outputDesmos = document.getElementById('outputDesmos');
let convertButton = document.getElementById('convert');

let fileInputObj = document.getElementById('objInput');
let fileUploadObjInput = document.getElementById('uploadObj');
let fileInputMtl = document.getElementById('mtlInput');
let fileUploadMtlInput = document.getElementById('uploadMtl');

let settingPrecision = document.getElementById('precision');
let setting3DPts = document.getElementById('pts3d');
let settingFace3d = document.getElementById('face3d');
let settingColor3d = document.getElementById('color3d');

convertButton.onclick = function() {
    let output = obj2Desmos(inputObj.value, +settingPrecision.value, setting3DPts.checked, settingFace3d.checked);
    if (inputMtl.value.includes('newmtl')) output += `\n${mtl2Desmos(inputMtl.value, inputObj.value, settingColor3d.checked)}`
    outputDesmos.value = output;
}

fileInputObj.onclick = () => { fileUploadObjInput.click() }
fileUploadObjInput.onchange = e => {
    let reader = new FileReader();
    reader.onload = evt => inputObj.textContent = evt.target.result;
    reader.readAsText(e.target.files[0]);
}
inputObj.ondragover = inputObj.ondragenter = e => { e.preventDefault() };
inputObj.ondrop = e => {
    e.preventDefault();

    let file = e.dataTransfer.files[0];
    let fileDot = file.name.split('.');
    if (fileDot[fileDot.length - 1] !== 'obj') {
        inputObj.textContent = 'Invalid OBJ';
        return;
    }

    let reader = new FileReader();
    reader.onload = evt => inputObj.textContent = evt.target.result;
    reader.readAsText(file);
}

fileInputMtl.onclick = () => { fileUploadMtlInput.click() }
fileUploadMtlInput.onchange = e => {
    let reader = new FileReader();
    reader.onload = evt => inputMtl.textContent = evt.target.result;
    reader.readAsText(e.target.files[0]);
}
inputMtl.ondragover = inputMtl.ondragenter = e => { e.preventDefault() };
inputMtl.ondrop = e => {
    e.preventDefault();

    let file = e.dataTransfer.files[0];
    let fileDot = file.name.split('.');
    if (fileDot[fileDot.length - 1] !== 'mtl') {
        inputMtl.textContent = 'Invalid MTL';
        return;
    }

    let reader = new FileReader();
    reader.onload = evt => inputMtl.textContent = evt.target.result;
    reader.readAsText(file);
}