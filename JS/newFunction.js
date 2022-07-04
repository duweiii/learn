// function a(params){
//   const { a, b } = params;
//   return a + b;
// }

const fnBody = `
  const { a, b } = params;
  console.log( a + b );
`

const fn = new Function("params", fnBody);

fn({a: 1, b: 2})