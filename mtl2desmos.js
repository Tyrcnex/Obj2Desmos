function mtl2Desmos(mtlInput, objInput) {
    let mtlArray = mtlInput.split(/\r?\n/);
    let objArray = objInput.split(/\r?\n/).map(e => {
        let newE = e;
        if (e[0] === 'f') newE = triangulate(e).map(q => `f ${q.join(' ')}`).join('\n');
        return newE;
    }).join('\n').split(/\r?\n/);;
    let colorArray = [];

    let materials = [];
    let cmMtl = ``;

    for (let line of mtlArray) {
        if (line.startsWith('newmtl')) {
            cmMtl = line.replace('newmtl Material.', '');
            materials.push({
                name: cmMtl,
            })
        }
        if (cmMtl.length > 0 && line.toLowerCase().startsWith('kd')) {
            materials.find(e => e.name === cmMtl).kd = line.replace('Kd ','').split(' ').map(e => Math.round(e*255));
        }
    }

    let cmObj = ``;
    for (let line of objArray) {
        if (line.startsWith('usemtl')) cmObj = line.replace('usemtl Material.', '');
        if (cmObj.length > 0 && line.charAt(0) === 'f') {
            colorArray.push(materials.find(e => e.name === cmObj).kd);
        }
    }
    
    let dataColor = colorArray[0].map((_, colIndex) => colorArray.map(row => row[colIndex]));
    let rawColor = dataColor.map((e,i) => `C_{${"rgb"[i]}}=\\left[${e.join(',')}\\right]`).join('\n');
    return rawColor;
}