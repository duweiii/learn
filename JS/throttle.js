const throttle = function(func, time){
  let flag = true;
  return function(){
    if(!flag) return ;
    flag = false;
    func.apply(null, arguments);
    setTimeout(()=>{
      flag = true;
    },time)
  }
}