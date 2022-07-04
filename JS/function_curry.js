// add(1)(2)(3)(4)  add(1)(2,3,4)(5)
function add() {
  const _args = [...arguments];
  
  const fn = function() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function(){
    return _args.reduce((total, value) => total + value)
  }

  return fn;
}
console.log( `${add(10)(2,3,4)(1)(2)}` )