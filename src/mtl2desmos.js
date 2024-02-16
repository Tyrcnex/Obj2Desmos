function mtl2Desmos(mtlInput, objInput, color3d) {
    let mtlArray = mtlInput.split(/\r?\n/);
    let objArray = objInput.split(/\r?\n/).map(e => {
        let newE = e;
        if (e.startsWith('f ')) newE = triangulate(e).map(q => `f ${q.join(' ')}`).join('\n');
        return newE;
    }).join('\n').split(/\r?\n/);

    let materials = [];
    let cmMtl = ``;

    for (let line of mtlArray) {
        if (line.startsWith('newmtl')) {
            cmMtl = line.replace('newmtl ', '');
            materials.push({
                name: cmMtl,
            })
        }
        if (cmMtl.length > 0 && line.toLowerCase().startsWith('kd')) {
            materials.find(e => e.name === cmMtl).kd = line.replace('Kd ','').split(' ').map(e => Math.round(e*255));
        }
    }

    let facesArray = [];
    for (let line of objArray) {
        if (line.startsWith('usemtl')) facesArray.push(0);
        if (line.charAt(0) === 'f') {
            facesArray[facesArray.length - 1] += 1;
        }
    }

    if (color3d) {
        return `c=\\left[${materials.map(e => '\\left(' + e.kd.join() + '\\right)')}\\right]\nc_{i}=\\left[${facesArray.join(',')}\\right]`;
    } else {
        let cr = materials.map(e => e.kd[0]);
        let cg = materials.map(e => e.kd[1]);
        let cb = materials.map(e => e.kd[2]);

        return `c_{r}=\\left[${cr.join(',')}\\right]\nc_{g}=\\left[${cg.join(',')}\\right]\nc_{b}=\\left[${cb.join(',')}\\right]\nc_{i}=\\left[${facesArray.join(',')}\\right]`;
    }
}