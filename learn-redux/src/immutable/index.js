var objSrc = {x: 1, y: 2, a: 456, b: 789, c: {i: 1, j: 2}};
var objCopy = {...objSrc};
console.log('objSrc', objSrc);
console.log('objCopy:', objCopy);
console.log('objSrc === objCopy', objSrc === objCopy);
console.log('objSrc.c === objCopy.c', objSrc.c === objCopy.c);

var arraySrc = [1, 2, 3];
var arrayCopy = [...arraySrc];
console.log('arraySrc', arraySrc);
console.log('arrayCopy:', arrayCopy);
console.log('arraySrc === arrayCopy', arraySrc === arrayCopy);
