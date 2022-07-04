let arr = [1,2,3,4,5]

const curry = function(...args){
  const _args = args;

  function to (){
    _args.push(...arguments)
    return to;
  }

  to.toString = function(){
    return _args.reduce( (total, next) => total + next)
  }

  return to;
}

console.log( `${curry(1)(2)(3)}` )