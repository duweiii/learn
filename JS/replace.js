let a = 'add-foo';

a.replace(/-(\w)/g, (a,b,c) => {
  console.log( a, b, c )
})
// a: -f      b: f    c: 3