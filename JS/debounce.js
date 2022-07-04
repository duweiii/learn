const debound = function(func, timeout){
  let timer ;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(()=>{
      func.apply(this, arguments)
    },timeout)
  }
}