// not perfect triangulation, but does the trick in 90% of cases because it triangulates flat convex quads correctly

function triangulate(input) {
    // If it's not in a form like [1,2,3] and is instead in a form like 'f 1 2 3', remove the f and turn the thing into an array.
    if (typeof input === 'string') input = input.split(' ').slice(1);
    input = input.map(e => parseFloat(e));

    let listOfInputs = [];
    for (let i = 0; i <= input.length - 3; i++) {
        listOfInputs.push([input[0]].concat(input.slice(i+1, i+3)));
    }
    return listOfInputs;
}