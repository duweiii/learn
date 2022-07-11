let add;
let compute;
let count = 10000;

function fetchAndInitiate(fileName){
  return fetch(fileName)
  .then(file => file.arrayBuffer())
  .then(bits => WebAssembly.compile(bits))
  .then(module => new WebAssembly.Instance(module))
}

function jsWhile(count){
  let index = 0;
  let result = 0;
  while(index <= count){
    result += index;
    index++;
  }
  return result;
}

function ticker(fn, count){
  console.time('some')
  fn(count);
  console.timeEnd('some')
}

fetchAndInitiate('test.wasm').then( res =>{
  add = res.exports._Z3addii;
  compute = res.exports._Z7computel;
  console.log( res.exports )
  window.compute = compute;
  
  ticker( compute, count )
  // 最快 0.0029ms

  ticker( jsWhile, count);
  // 最快 0.17ms
})