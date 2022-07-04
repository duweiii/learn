const a = (a,b,c) => {
  console.log( a, b, c)
}

let b = a.bind(null, 1, 2);

console.log( b(3) ) 
// 1 2 3