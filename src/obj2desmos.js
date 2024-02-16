function obj2Desmos(input, pts3d) {
    let objArray = input.split(/\r?\n/).map(e => {
        let newE = e;
        if (e.startsWith('f ')) newE = triangulate(e).map(q => `f ${q.join(' ')}`).join('\n');
        return newE;
    }).join('\n').split(/\r?\n/);

    let rawVertices = objArray.filter(e => e.startsWith('v '));
    let vertices = rawVertices.map(e => e.split(/\s+/).slice(1))
    let rawFaces = objArray.filter(e => e[0] === 'f');
    let faces = rawFaces.map(e => e.split(/\s+/).slice(1))
    console.log(faces);

    let info = [];
    if (pts3d) {
        info.push(`v=\\left[${vertices.map(x => `\\left(${x.map(e => Number(parseFloat(e).toFixed(5))).join()}\\right)`)}\\right]`)
    } else {
        for (let i = 0; i < 3; i++) {
            info.push(`${i === 0 ? 'x_{v}' : (i === 1 ? 'y_{v}' : 'z_{v}')}=\\left[${vertices.map(e => Number(parseFloat(e[i]).toFixed(5))).join()}\\right]`);
        }
    }

    for (let i = 0; i < 3; i++) {
        info.push(`${i === 0 ? 'f_{1}' : (i === 1 ? 'f_{2}' : 'f_{3}')}=\\left[${faces.map(e => Number(parseFloat(e[i].split('/')[0]).toFixed(5))).join()}\\right]`);
    }

    return info.join('\n');
}